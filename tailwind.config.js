import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
const {
    default: flattenColorPalette,
  } = require("tailwindcss/lib/util/flattenColorPalette");
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
    	extend: {
            animation: {
                scroll:
                  "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
                'bounce-slow': 'bounce 2s infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 3s linear infinite',
                'loading-bar': 'loading 1.5s ease-in-out infinite',
                'slide-up': 'slideUp 0.3s ease-out',
                'slide-down': 'slideDown 0.3s ease-out',
                'fade-in': 'fadeIn 0.3s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
              },
              keyframes: {
                scroll: {
                  to: {
                    transform: "translate(calc(-50% - 0.5rem))",
                  },
                },
                loading: {
                  '0%': { width: '0%' },
                  '50%': { width: '70%' },
                  '100%': { width: '100%' },
                },
                slideUp: {
                  '0%': { transform: 'translateY(10px)', opacity: '0' },
                  '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                  '0%': { transform: 'translateY(-10px)', opacity: '0' },
                  '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                  '0%': { opacity: '0' },
                  '100%': { opacity: '1' },
                },
                scaleIn: {
                  '0%': { transform: 'scale(0.9)', opacity: '0' },
                  '100%': { transform: 'scale(1)', opacity: '1' },
                },
              },
              borderWidth: {
                '3': '3px',
                '5': '5px',
                '6': '6px',
                '8': '8px',
              },
              boxShadow: {
                'brutal-sm': 'rgba(0, 0, 0, 0.9) 0px 2px 0px 0px',
                'brutal': 'rgba(0, 0, 0, 0.9) 0px 4px 0px 0px',
                'brutal-md': 'rgba(0, 0, 0, 0.9) 0px 6px 0px 0px',
                'brutal-lg': 'rgba(0, 0, 0, 0.9) 0px 8px 0px 0px',
                'brutal-xl': 'rgba(0, 0, 0, 0.9) 0px 12px 0px 0px',
                'brutal-red': 'rgba(139, 0, 0, 0.9) 0px 4px 0px 0px',
                'brutal-red-md': 'rgba(139, 0, 0, 0.9) 0px 6px 0px 0px',
                'card-hover': 'rgba(96, 75, 74, 0.3) 0px 70px 30px -50px',
                'card-inset': 'rgba(96, 75, 74, 0.188) 0px 5px 5px 0px inset',
              },
              transitionTimingFunction: {
                'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                'smooth': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
              },
    		fontFamily: {
    			sans: [
    				'Figtree',
                    ...defaultTheme.fontFamily.sans
                ]
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			},
                orange: {
                    DEFAULT: '#f68c09',
                    50: '#fff7ed',
                    100: '#ffedd5',
                    light: '#ffa733',
                    dark: '#e67e00',
                    hover: '#f55d56',
                }
    		}
    	}
    },

    plugins: [forms, require("tailwindcss-animate"),addVariablesForColors],
};
function addVariablesForColors({ addBase, theme }) {
    let allColors = flattenColorPalette(theme("colors"));
    let newVars = Object.fromEntries(
      Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );

    addBase({
      ":root": newVars,
    });
  }
