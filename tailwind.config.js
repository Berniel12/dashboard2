/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInFromBottom: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scanLine: {
          '0%': { 
            transform: 'translateY(-100%)',
            opacity: '0'
          },
          '10%': { 
            opacity: '1'
          },
          '90%': { 
            opacity: '1'
          },
          '100%': { 
            transform: 'translateY(100%)',
            opacity: '0'
          }
        },
        scanGlow: {
          '0%': { 
            boxShadow: '0 0 10px rgba(59, 130, 246, 0)',
            opacity: '0'
          },
          '50%': { 
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
            opacity: '1'
          },
          '100%': { 
            boxShadow: '0 0 10px rgba(59, 130, 246, 0)',
            opacity: '0'
          }
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        typewriter: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'currentColor' },
        },
        progress: {
          '0%': { width: '0%' },
          '50%': { width: '100%' },
          '100%': { width: '100%' }
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'fadeIn': 'fadeIn 0.5s ease-out',
        'slideInFromBottom': 'slideInFromBottom 0.5s ease-out',
        'slideInFromRight': 'slideInFromRight 0.5s ease-out',
        'scan-line': 'scanLine 2.5s ease-in-out infinite',
        'scan-glow': 'scanGlow 2.5s ease-in-out infinite',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'typewriter': 'typewriter 2s steps(40, end)',
        'blink': 'blink 0.75s step-end infinite',
      },
      transitionProperty: {
        'theme': 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
      },
      transitionDuration: {
        '250': '250ms',
      },
      transitionTimingFunction: {
        'theme': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backgroundColor: {
        'dark-card': '#1F2937',
        'dark-hover': '#374151',
      },
      borderColor: {
        'dark-border': '#374151',
      },
      textColor: {
        'dark-text': '#E5E7EB',
        'dark-text-secondary': '#9CA3AF',
      }
    },
  },
  plugins: [],
} 