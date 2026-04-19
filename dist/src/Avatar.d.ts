/**
 * RGB color object.
 */
export type RGB = {
    r: number;
    g: number;
    b: number;
};
/**
 * Avatar configuration options.
 */
export type Config = {
    generator?: (name: string) => RGB;
    fontSize?: number;
    fontWeight?: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
    fontColor?: RGB;
    size?: number;
};
/**
 * Avatar component that renders a circular user avatar with a deterministic background color.
 *
 * @param username User name used for color generation and initial.
 * @param config (Optional) Customize visual and generator configuration.
 * @returns {JSX.Element} A circular avatar component with a generated background color.
 */
export default function Avatar({ username, config, }: {
    username: string;
    config?: Config;
}): import("react/jsx-runtime").JSX.Element;
/**
 * Clears internal color cache used by defaultGenerator.
 */
export declare function clearCache(): void;
/**
 * Default color generator for the background color of an avatar.
 *
 * @param username - Input string used to generate color
 * @returns RGB color object
 */
export declare function defaultGenerator(username: string): RGB;
