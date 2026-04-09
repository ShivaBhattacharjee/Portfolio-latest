<img width="1440" height="1080" alt="screenshot_1 5x_postspark_2026-04-10_03-11-15" src="https://github.com/user-attachments/assets/04da7cb1-87b3-47f4-b72a-454568df7d52" />

## Installation

### Prerequisites

- Node.js 18+
- Bun (recommended) or npm/yarn

### 1. Clone the repository

```bash
git clone https://github.com/ShivaBhattacharjee/portfolio-2025.git
cd portfolio-2025
```

### 2. Install dependencies

```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install

# Or using yarn
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your environment variables:

```env
DISCORD_BOT_TOKEN=
DISCORD_RECIPIENT_ID=
# optional
NEXT_PUBLIC_GITHUB_TOKEN=
```

### 4. Run the development server

```bash
# Using Bun
bun dev

# Or using npm
npm run dev

# Or using yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Build for Production

```bash
# Using Bun
bun run build
bun start

# Or using npm
npm run build
npm start
```

## Project Structure

```text
src/
├── app/                 # Next.js app directory
├── components/          # Reusable components
│   ├── ui/             # UI primitives
│   ├── sections/       # Page sections
│   └── layout/         # Layout components
├── constants/          # Static data and constants
├── lib/               # Utility functions
└── utils/             # Additional utilities
```

## Customization

### 1. Update Personal Information

Edit the constants in `src/constants/index.js`:

- Navigation links
- Personal introductions
- Work experiences
- Projects showcase

### 2. Modify Theme Colors

Update the theme in `src/app/globals.css`:

- CSS custom properties for light/dark themes
- Tailwind configuration in `tailwind.config.js`

### 3. Add/Remove Sections

Components are modular and can be easily added or removed from the main pages.

## Important Warnings

### Personal Data

- **Remove all personal information** before deploying your own version
- Update social media links, email addresses, and contact information
- Replace project links and descriptions with your own

### Content License

- This template is free to use for personal and commercial projects


### Customization Required

- **Update the contact form** with your own email service configuration
- **Replace placeholder content** in all sections
- **Modify or remove** the specific project examples and experiences

### Deployment Considerations

- Ensure all environment variables are properly configured
- Test the contact form functionality before going live
- Optimize images and assets for production

## Template Usage

Feel free to use this template for your own portfolio! Here's what you should do:


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you have any questions or need help customizing this template, feel free to open an issue on GitHub.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://radix-ui.com/)
- Animations powered by [Framer Motion](https://framer.com/motion/)

---

Made by [Shiva Bhattacharjee](https://github.com/ShivaBhattacharjee)
