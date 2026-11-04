/**
 * Legal page content (HTML), migrated from the old site.
 * Brand renamed to NivLearn. Email addresses are DUMMY (example.com) -
 * replace with real NivLearn addresses before going live.
 * NOTE: these texts were written for NevoLearn - have them reviewed.
 */

export type LegalSlug = 'terms-and-conditions' | 'privacy-policy' | 'refund-policy' | 'grievance-redressal-policy';

export interface LegalDoc {
  slug: LegalSlug;
  /** Short label for the sidebar. */
  navLabel: string;
  title: string;
  html: string;
}

export const LEGAL_DOCS: readonly LegalDoc[] = [
  {
    slug: 'terms-and-conditions',
    navLabel: 'Terms & Conditions',
    title: 'Terms and Conditions',
    html: `<p>
These terms and conditions govern the use of our educational services and materials by our students and users. By accessing and using our services, you agree to comply with these terms and conditions.
<br /><br />
<b>Registration and account</b><br />
To access our educational services and support, you may be required to register and create an account. You must provide accurate and complete information when registering and keep your account information up-to-date. You are responsible for maintaining the confidentiality of your account and password and for all activities that occur under your account.
<br /><br />
<b>Our Services</b><br />
We provide educational services and materials to our students and users, including online courses, workshops, and learning resources. Our services are intended for personal, non-commercial use only.
<br /><br />
<b>Payment and fees</b><br />
You may be required to pay fees for our educational services and materials. Payment must be made in full at the time of registration or purchase. We reserve the right to modify our fees at any time, but we will notify you of any changes in advance.
<br /><br />
<b>Intellectual property</b><br />
We own or have licensed all intellectual property rights in our educational services and materials, including copyrights, trademarks, and other proprietary rights. You may not reproduce, distribute, or modify our services or materials without our prior written consent.
<br /><br />
<b>User Content</b><br />
You may submit content, such as comments, questions, or feedback, to our educational services or materials. By submitting content, you grant us a non-exclusive, worldwide, royalty-free, and transferable license to use, display, and modify your content for educational and promotional purposes.
<br /><br />
<b>User Conduct</b><br />
You agree to use our educational services and support only for lawful purposes and in accordance with these terms and conditions. You may not use our services to engage in any activity that is illegal, fraudulent, or harmful to others.
<br /><br />
<b>Privacy</b><br />
We collect and use personal information from our students and users in accordance with our privacy policy. By using our services, you agree to our collection and use of your personal information as described in our privacy policy.
<br /><br />
<b>Disclaimer of Warranties</b><br />
We provide our educational services and materials on an "as is" and "as available" basis, without warranties of any kind, either express or implied. We do not guarantee the accuracy, completeness, or usefulness of our services or materials.
<br /><br />
<b>Termination and suspension</b><br />
We may terminate or suspend your access to our educational services and support at any time and for any reason, including if you violate these terms and conditions. Upon termination or suspension, your right to use our services will immediately cease, and you must delete all course materials and content.
<br /><br />
<b>Limitation of liability</b><br />
We are not liable for any indirect, incidental, or consequential damages arising from your use of our educational services and support. Our liability is limited to the amount of fees paid by you for our services.
<br /><br />
<b>Governing law and jurisdiction</b><br />
These terms and conditions are governed by the laws of [insert governing law] and are subject to the exclusive jurisdiction of the courts of Bangalore Court.
<br /><br />
<b>Changes to these terms and conditions</b><br />
We may update these terms and conditions from time to time to reflect changes in our services or legal requirements. We will notify you of any material changes to these terms and conditions and obtain your consent where necessary.
<br /><br />
<b>Contact us</b><br />
If you have any questions or concerns about these terms and conditions, please contact us at www.nivlearn.com
</p>`,
  },
  {
    slug: 'privacy-policy',
    navLabel: 'Privacy Policy',
    title: 'Privacy Policy',
    html: `<p>
At <span>NivLearn</span>, we are committed to protecting the privacy and personal information of our students, parents, and other stakeholders. This privacy policy outlines how we collect, use, and protect personal information and individuals' rights to access, correct, and delete their personal information.
<br /> <br />
<b>Information we collect</b><br />
We collect personal information such as names, addresses, email addresses, and phone numbers from students, parents, and other stakeholders during the admission and registration process, as well as through surveys and other forms of communication. We also collect academic and health-related information and other sensitive information required for educational purposes.
<br /> <br />
<b>How we use your information</b><br />
We use personal information to provide educational services and communicate with students, parents, and other stakeholders. We also use personal information to improve our services and to comply with legal and regulatory requirements. We may share personal information with our service providers and partners for educational purposes, such as student assessments or career counseling.
<br /> <br />
How we share your information<br />
We may share your personal information with third-party service providers, such as cloud storage providers, payment processors, and educational partners, for the purpose of delivering our educational services and support. We do not sell or rent your personal information to third parties for marketing purposes.
<br /> <br />
<b>How we protect your information</b><br />
We take appropriate technical and organizational measures to protect the security and privacy of your personal information. We use encryption, firewalls, and other security measures to protect your information from unauthorized access, disclosure, and loss.
<br /> <br />
<b>Access, Correction, and Deletion of Personal Information</b><br />
Individuals have the right to access, correct, or delete their personal information by submitting a written request to [contact information]. We will respond to requests in a timely manner and will take appropriate steps to verify the identity of the requester before providing access to personal information.
<br /> <br />
<b>Changes to Privacy</b> <br />
We may update this privacy policy occasionally to reflect changes in our practices or legal requirements. We will notify individuals of any material changes to the privacy policy and obtain their consent if required by law.
<br /> <br />
<b>Contact Us</b><br />
If you have any questions or concerns regarding this privacy policy or our privacy practices, please contact us at www.nivlearn.com
</p>`,
  },
  {
    slug: 'refund-policy',
    navLabel: 'Cancellation & Refund Policy',
    title: 'Refund Policy',
    html: `<p>
Thank you for choosing <b>NivLearn Global Pvt. Ltd.</b> We are committed to providing high-quality educational services to all our students. This Refund Policy outlines the terms and conditions for requesting a refund for services and courses offered by our organization. We encourage you to read this policy carefully before making a purchase.
<br /><br />
<b>NivLearn Global Pvt. Ltd.</b> reserves the right to <b>postpone, cancel, or change the location</b> of a course or event due to unforeseen circumstances, including but not limited to:
<br />
<ul>
<li>Insufficient enrollments</li>
<li>Instructor illness</li>
<li>Force majeure events (e.g., floods, earthquakes, political unrest, etc.)</li>
</ul>
Please note that the terms and conditions outlined in this policy <b>may not apply</b> to registrants who enroll using a <b>Purchase Order</b> or through <b>special pricing offers</b> (such as promotional or corporate discounts). In such cases, the refund terms will be governed by the specific agreement made at the time of registration.
<br /><br />
<b>Refund Policy for Cohort-Based Course Purchases</b>
<br />
We understand that plans can change. To provide clarity and fairness, we have outlined our refund policy for cohort-based courses below:
<br /><br />
<b>1. 100% Refund – 10 Days Prior to Cohort Start</b>
<br />
You are eligible for a <b>full refund (100%)</b> if you submit your refund request <b>at least 10 days before</b> the cohort start date.
<br /><br />
<b>2. 50% Refund – Up to 48 Hours Prior to Cohort Start</b>
<br />
If your refund request is received <b>less than 10 days but more than 48 hours</b> before the cohort start date, you will be eligible for a <b>50% refund</b>.
<br /><br />
<b>3. No Refund – Within 48 Hours or After Cohort Start</b>
<br />
No refunds will be issued for requests made <b>within 48 hours of the cohort's start date</b> or <b>after the cohort has begun</b>, regardless of participation or going uninformed.
<br /><br />
<b>4. Course Materials and Resources</b>
<br />
<b>Digital and Physical Materials:</b> Fees paid for course materials whether digital (e.g., e-books, access codes) or physical (e.g., textbooks, printed workbooks) are <b>non-refundable</b> unless the materials are found to be <b>defective or unusable</b> upon receipt.
<br /><br />
In such cases, students must notify <b>NivLearn Global Pvt. Ltd.</b> in writing <b>within 7 days</b> of receiving the materials. Upon verification, a <b>replacement</b> will be provided, or a <b>refund may be issued</b> at our discretion.
<br /><br />
<b>5. How to Request a Refund</b>
<br />
To request a refund, please email us at <a href="mailto:refund@example.com" style="color: #0066cc; text-decoration: underline; font-family: Arial, sans-serif;">refund@example.com</a> with:
<br />
<ul>
<li>Your full name</li>
<li>Course name</li>
<li>Order number or proof of payment</li>
<li>Valid reason for cancellation</li>
</ul>
Refunds will be processed to the original method of payment within <b>30 business days</b> of approval.
<br /><br />
<b>6. Exceptional Circumstances</b>
<br />
We understand that exceptional situations can occur. If you believe your case deserves special consideration, please reach out with a detailed explanation and with relevant proof for refund.
<br /><br />
<b>7. Policy Updates</b>
<br />
We reserve the right to update this refund policy at any time. Any changes will be posted on our website and will apply to future purchases.
<br /><br />
If you have any questions or require further clarification regarding our refund policy, please contact our administration department.
</p>`,
  },
  {
    slug: 'grievance-redressal-policy',
    navLabel: 'Grievance Redressal Policy',
    title: 'Grievance Redressal Policy',
    html: `<p>
NivLearn is a Founding member of the India EdTech Consortium (IEC), which is a self-regulatory body. <br/>
As a member of the IEC, NivLearn is committed to resolve grievances within 30 days. We have a dedicated team of associates to address grievances, feedback or queries from our learners regarding our online learning programs. <br/> <br/>
If you have any complaints, feedback, or questions about our online learning programs, you may fill out this form or contact us using the information provided below.
<br/> <br/>
Rest assured we will respond to your concerns within 48 Business Hours<br/> <br/>
<strong>We’re available 24*7 to assist you</strong>
<br/> <br/>
If you have enrolled as a learner to any of our online learning programs and have a course related query, please follow the below steps for help.
<br/> <br/>
</p>`,
  },
];

export const getLegalDoc = (slug: LegalSlug) => LEGAL_DOCS.find((d) => d.slug === slug)!;

/** Grievance officer block (grievance page only). DUMMY - replace before going live. */
export const GRIEVANCE_OFFICER = {
  name: 'Officer Name', // DUMMY
  email: 'support@example.com', // DUMMY
} as const;
