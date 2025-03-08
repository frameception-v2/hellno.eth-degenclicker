import { ImageResponse } from "next/og";
import { PROJECT_TITLE, PROJECT_DESCRIPTION } from "~/lib/constants";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = PROJECT_TITLE;
export const contentType = "image/png";

// Function to load font with error handling
async function loadFont(fontPath: string): Promise<Buffer> {
  try {
    return await readFile(fontPath);
  } catch (error) {
    // Fallback to loading from absolute path
    try {
      const absolutePath = join(process.cwd(), fontPath.replace(/^public\//, ""));
      return await readFile(absolutePath);
    } catch (fallbackError) {
      throw new Error(`Failed to load font ${fontPath}: ${error}`);
    }
  }
}

// Create reusable options object with proper type
let imageOptions: ConstructorParameters<typeof ImageResponse>[1] | null = null;

// Initialize fonts
async function initializeFonts(): Promise<ConstructorParameters<typeof ImageResponse>[1]> {
  if (imageOptions) return imageOptions;

  try {
    const regularFont = await loadFont(
      join(process.cwd(), "public/fonts/Orbitron-Regular.ttf")
    );
    const semiBoldFont = await loadFont(
      join(process.cwd(), "public/fonts/Orbitron-SemiBold.ttf") 
    );

    imageOptions = {
      width: 1200,
      height: 800,
      fonts: [
        {
          name: "Orbitron",
          data: regularFont,
          weight: 400,
          style: "normal",
        },
        {
          name: "Orbitron", 
          data: semiBoldFont,
          weight: 600,
          style: "normal",
        },
      ],
    };

    return imageOptions;
  } catch (error) {
    throw error;
  }
}

export default async function Image() {
  const options = await initializeFonts();

  const BACKGROUND_GRADIENT_START = "#0f172a";
  const BACKGROUND_GRADIENT_END = "#1e1b4b";
  const BACKGROUND_GRADIENT_STYLE = {
    backgroundImage: `linear-gradient(to bottom, ${BACKGROUND_GRADIENT_START}, ${BACKGROUND_GRADIENT_END})`,
    color: "#e879f9",
  };

  /*
this Image is rendered using vercel/satori.

Satori supports a limited subset of HTML and CSS features, due to its special use cases. In general, only these static and visible elements and properties that are implemented.
For example, the <input> HTML element, the cursor CSS property are not in consideration. And you can't use <style> tags or external resources via <link> or <script>.
Also, Satori does not guarantee that the SVG will 100% match the browser-rendered HTML output since Satori implements its own layout engine based on the SVG 1.1 spec.
Please refer to Satori’s documentation for a list of supported HTML and CSS features. https://github.com/vercel/satori#css
*/
  return new ImageResponse(
    (
      <div
        tw="h-full w-full flex flex-col justify-center items-center relative"
        style={BACKGROUND_GRADIENT_STYLE}
      >
        {/* Glow effect layers */}
        <div tw="absolute inset-0 blur-2xl opacity-30" style={{ 
          background: "linear-gradient(to right, #8b5cf6, #ec4899)",
        }} />
        <div tw="absolute inset-0 blur-xl opacity-50" style={{ 
          background: "linear-gradient(to right, #7c3aed, #db2777)",
        }} />
        
        {/* Main text with multiple shadows */}
        <h1 tw="text-8xl text-center font-semibold" style={{
          textShadow: "0 0 10px #c026d3, 0 0 20px #c026d3, 0 0 30px #c026d3",
          filter: "drop-shadow(0 0 5px rgba(192, 38, 211, 0.5))",
          letterSpacing: "-0.05em"
        }}>🎩 DegenClicker</h1>
        <h3 tw="text-3xl mt-4 font-medium" style={{
          textShadow: "0 0 8px #60a5fa, 0 0 16px #60a5fa",
          color: "#93c5fd"
        }}>▸ {PROJECT_DESCRIPTION} ▸</h3>
      </div>
    ),
    options
  );
}
