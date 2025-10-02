export type LegalContentType = 'privacy' | 'terms';

export const legalContent = {
    privacy: {
        title: 'Privacy Policy',
        content: `
            <h3>1. Information We Collect</h3>
            <p>We collect information you provide directly to us, such as when you create an account, fill out a form, or communicate with us. This may include your name, email address, and any other information you choose to provide.</p>
            <h3>2. How We Use Information</h3>
            <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to protect DevilsLab and our users. We do not share your personal information with third parties except as described in this policy.</p>
            <p>Last updated: October 3, 2025</p>
        `
    },
    terms: {
        title: 'Terms of Service',
        content: `
            <h3>1. Acceptance of Terms</h3>
            <p>By accessing or using the services provided by DevilsLab, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
            <h3>2. Use of Services</h3>
            <p>You agree to use our services only for lawful purposes. You are responsible for all activity that occurs under your account. You may not use our services in any manner that could damage, disable, or impair any of our servers or networks.</p>
            <p>Last updated: October 3, 2025</p>
        `
    }
};
