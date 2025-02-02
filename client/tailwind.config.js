/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        border: "var(--border)",
        hover: "var(--hover)",
        "box-shadow": "var(--box-shadow)",
        input: {
          bg: "var(--input-bg)",
          border: "var(--input-border)",
          focus: "var(--input-focus-border)",
          text: "var(--input-text)",
        },
        btn: {
          bg: "var(--btn-bg)",
          hover: "var(--btn-hover-bg)",
          disabled: "var(--btn-disabled-bg)",
          text: "var(--btn-text)",
        },
        link: "var(--link)",
        card: "var(--card-bg)",
        scrollbar: {
          thumb: "var(--scrollbar-thumb)",
          track: "var(--scrollbar-track)",
        },
      },
    },
  },
  safelist: [
    'text-[var(--status-active)]',
    'text-[var(--status-idle)]',
    'text-[var(--status-charging)]',
    'text-[var(--status-maintenance)]',
    'text-[var(--status-off)]',
  ],
  plugins: [require("tailwindcss-animate")],
};
