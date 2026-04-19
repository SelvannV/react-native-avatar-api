import { StyleSheet, Text, View } from "react-native";

/**
 * RGB color object.
 */
export type RGB = { r: number; g: number; b: number };

/**
 * Avatar configuration options.
 */
export type Config = {
  generator?: (name: string) => RGB;

  fontSize?: number;
  fontWeight?:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  fontColor?: RGB;

  size?: number;
};

const DEFAULT_CONFIG = {
  size: 48,
  fontSize: 24,
  fontWeight: "600" as const,
  fontColor: { r: 255, g: 255, b: 255 },
};

/**
 * Avatar component that renders a circular user avatar with a deterministic background color.
 *
 * @param username User name used for color generation and initial.
 * @param config (Optional) Customize visual and generator configuration.
 * @returns {JSX.Element} A circular avatar component with a generated background color.
 */
export default function Avatar({
  username,
  config = {},
}: {
  username: string;
  config?: Config;
}) {
  const safeUsername = (username ?? "").trim() || "?";
  const generator = config.generator ?? defaultGenerator;

  const mergedConfig = {
    ...DEFAULT_CONFIG,
    ...config,
    fontColor: {
      ...DEFAULT_CONFIG.fontColor,
      ...config.fontColor,
    },
  };

  const { r, g, b } = generator(safeUsername);

  return (
    <View
      style={[
        styles.avatar,
        { width: mergedConfig.size, backgroundColor: `rgb(${r}, ${g}, ${b})` },
      ]}
      accessibilityLabel={`Avatar for ${safeUsername}`}
      accessibilityRole="image"
      accessibilityHint="User avatar"
    >
      <Text
        style={{
          fontSize: mergedConfig.fontSize,
          fontWeight: mergedConfig.fontWeight,
          color: `rgb(${mergedConfig.fontColor.r}, ${mergedConfig.fontColor.g}, ${mergedConfig.fontColor.b})`,
        }}
      >
        {safeUsername.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    aspectRatio: 1,
  },
});

const cache = new Map<string, RGB>();
const MAX_SIZE = 1000;

function setCache(key: string, value: RGB) {
  if (cache.has(key)) cache.delete(key);
  cache.set(key, value);

  if (cache.size > MAX_SIZE) {
    const oldestKey = cache.keys().next().value;
    cache.delete(oldestKey);
  }
}

/**
 * Clears internal color cache used by defaultGenerator.
 */
export function clearCache() {
  cache.clear();
}

/**
 * Default color generator for the background color of an avatar.
 *
 * @param username - Input string used to generate color
 * @returns RGB color object
 */
export function defaultGenerator(username: string): RGB {
  const normalized = username.trim().toLowerCase();

  // ✅ cache hit
  const cached = cache.get(normalized);
  if (cached) return cached;

  const hash = hashString(normalized);

  const hue = hash % 360;
  const step = 24;
  const snappedHue = Math.floor(hue / step) * step;

  const saturation = 70;
  const lightness = 55;

  const rgb = hslToRgb(snappedHue, saturation, lightness);

  const normalize = (v: number) => 100 + Math.round((v / 255) * 100);

  const result: RGB = {
    r: normalize(rgb.r),
    g: normalize(rgb.g),
    b: normalize(rgb.b),
  };

  // ✅ cache store
  setCache(normalized, result);

  return result;
}

function hashString(str: string): number {
  let hash = 2166136261; // FNV offset basis

  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function hslToRgb(h: number, s: number, l: number): RGB {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}
