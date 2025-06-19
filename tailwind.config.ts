import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      dropShadow: {
        "3xl": "0 10px 30px rgba(0, 0, 0, 0.05)",
        top: "0 -2px 8px rgba(0, 0, 0, 0.5)",
      },
      colors: {
        "visibuy-blue": "#007aff",
        "visibuy-black": "#000000",
        "visibuy-gold":"#e4a826",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        background: "hsl(var(--background))",
        // blue: "hsl(var(--background-blue))",
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        foreground: "hsl(var(--foreground))",
        ring: "hsl(var(--ring))",

        nav: {
          foreground: {
            DEFAULT: "hsl(var(--nav-foreground))",
            active: "hsl(var(--nav-foreground-active))",
          },
        },
        blue: {
          DEFAULT: "hsl(var(--background-blue))",
          "200": "hsl(var(--background-blue-200))",
        },
        light: {
          background: "hsl(var(--light-background))",
          gray: {
            DEFAULT: "hsl(var(--light-gray))",
            "600": "hsl(var(--light-gray-600))",
          },
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          "150": "hsl(var(--primary-150))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Exact Visibuy Brand Colors
        visibuy: {
          primary: "#007BFF", // Primary Blue
          green: "#28A745", // Primary Green
          "light-shade": "#F1F1F1", // Light Shade
          "dark-gray": "#333333", // Dark Gray
          "light-blue-tint": "#CCE3FF", // Light Blue Tint
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        Montserrat: ["var(--font-Montserrat)"],
        OpenSans: ["var(--font-OpenSans)"],
      },
      keyframes: {
        rotation: {
          "0%": {
            transform: "rotate(0deg);",
          },
          "100%": {
            transform: "rotate(360deg);",
          },
        },
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        blink: {
          "50%": { "border-color": "transparent" },
          "100%": { "border-color": "black" },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        rotation: "rotation 1s linear infinite",
        typing: "typing 2s steps(30, end) forwards",
        blink: "blink 0.7s step-end infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bounce-slow": "bounce 5s infinite",
      },
    },
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      const fontSizes = theme("fontSize") ?? {};
      const spacing = theme("spacing") ?? {};
      const widths = theme("width") ?? {};
      const heights = theme("height") ?? {};
      const gaps = theme("gap") ?? {};
      const insets = theme("inset") ?? {};
      const maxWidths = theme("maxWidth") ?? {};
      const lineHeights = theme("lineHeight") ?? {};

      const scaleRem = (val: string) => {
        const remMatch = val.match(/^([\d.]+)rem$/);
        if (!remMatch) return val;
        const num = parseFloat(remMatch[1]);
        return `${(num * 1.6).toFixed(4)}rem`;
      };

      const generateScaled = (
        prefix: string,
        values: any,
        cssProp: string | string[],
      ) => {
        return Object.entries(values).reduce(
          (acc, [key, val]) => {
            if (typeof val === "string") {
              const props = Array.isArray(cssProp) ? cssProp : [cssProp];
              const safeKey = key.replace(/\//g, "\\/");
              acc[`.visibuy .${prefix}-${safeKey}`] = props.reduce(
                (style, prop) => {
                  style[prop] = scaleRem(val);
                  return style;
                },
                {} as Record<string, any>,
              );
            }
            return acc;
          },
          {} as Record<string, any>,
        );
      };

      const visibuyTextClasses = Object.entries(fontSizes).reduce(
        (acc, [key, val]) => {
          const [size, options] = Array.isArray(val) ? val : [val, {}];
          const safeKey = key.replace(/\//g, "\\/");
          const lineHeightKey = options.lineHeight;
          const resolvedLineHeight =
            typeof lineHeightKey === "string" && lineHeights[lineHeightKey]
              ? scaleRem(lineHeights[lineHeightKey])
              : undefined;

          acc[`.visibuy .text-${safeKey}`] = {
            fontSize: scaleRem(size),
            ...(resolvedLineHeight ? { lineHeight: resolvedLineHeight } : {}),
            ...(options.letterSpacing
              ? { letterSpacing: options.letterSpacing }
              : {}),
            ...(options.fontWeight ? { fontWeight: options.fontWeight } : {}),
          };
          return acc;
        },
        {} as Record<string, any>,
      );

      const paddingClasses = generateScaled("p", spacing, "padding");
      const paddingXClasses = generateScaled("px", spacing, [
        "paddingLeft",
        "paddingRight",
      ]);
      const paddingYClasses = generateScaled("py", spacing, [
        "paddingTop",
        "paddingBottom",
      ]);

      const marginClasses = generateScaled("m", spacing, "margin");
      const marginXClasses = generateScaled("mx", spacing, [
        "marginLeft",
        "marginRight",
      ]);
      const marginYClasses = generateScaled("my", spacing, [
        "marginTop",
        "marginBottom",
      ]);

      const widthClasses = generateScaled("w", widths, "width");
      const heightClasses = generateScaled("h", heights, "height");
      const gapClasses = generateScaled("gap", gaps, "gap");
      const insetClasses = generateScaled("inset", insets, [
        "top",
        "right",
        "bottom",
        "left",
      ]);
      const maxWidthClasses = generateScaled("max-w", maxWidths, "maxWidth");
      const lineHeightClasses = generateScaled(
        "leading",
        lineHeights,
        "lineHeight",
      );

      addComponents({
        ".visibuy": {
          fontSize: "16px",
        },
        ...visibuyTextClasses,
        ...paddingClasses,
        ...paddingXClasses,
        ...paddingYClasses,
        ...marginClasses,
        ...marginXClasses,
        ...marginYClasses,
        ...widthClasses,
        ...heightClasses,
        ...gapClasses,
        ...insetClasses,
        ...maxWidthClasses,
        ...lineHeightClasses,
      });
    }),
  ],
};
export default config;
