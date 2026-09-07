import { jsPDF } from "jspdf";
import { CONTACT, EXPERIENCE, DESIGN_SKILLS, COMM_SKILLS, TECH_SKILLS, SOFT_SKILLS, CERTS } from "../data";

export function generateCV() {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 20;

  // Colors
  const pine: [number, number, number] = [0, 67, 154]; // #00439a
  const gold: [number, number, number] = [247, 185, 0]; // #F7B900
  const darkText: [number, number, number] = [16, 29, 51]; // #101D33
  const lightText: [number, number, number] = [71, 86, 110]; // #47566E

  // Header
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...pine);
  doc.text(CONTACT.name, margin, y);
  y += 8;

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...lightText);
  doc.text("Creative Graphics Designer & Digital Media Specialist", margin, y);
  y += 12;

  // Contact info
  doc.setFontSize(10);
  doc.setTextColor(...darkText);
  doc.text(`Email: ${CONTACT.email}`, margin, y);
  y += 5;
  doc.text(`Phone: ${CONTACT.phone1} | ${CONTACT.phone2}`, margin, y);
  y += 5;
  doc.text(`Location: ${CONTACT.location}`, margin, y);
  y += 10;

  // Divider
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // About section
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...pine);
  doc.text("About", margin, y);
  y += 7;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...darkText);
  const aboutText = "Detail-oriented and result-driven creative professional with experience in graphics design, digital media, social media management, communications, customer service, and IT support. Creating positive customer and audience experiences through innovative design and strategic communication.";
  const aboutLines = doc.splitTextToSize(aboutText, pageWidth - 2 * margin);
  doc.text(aboutLines, margin, y);
  y += aboutLines.length * 5 + 8;

  // Experience section
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...pine);
  doc.text("Experience", margin, y);
  y += 7;

  EXPERIENCE.forEach((role) => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...darkText);
    doc.text(role.title, margin, y);
    y += 5;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...lightText);
    doc.text(`${role.org} | ${role.period}`, margin, y);
    y += 5;

    doc.setTextColor(...darkText);
    const noteLines = doc.splitTextToSize(role.note, pageWidth - 2 * margin);
    doc.text(noteLines, margin, y);
    y += noteLines.length * 5 + 6;
  });

  y += 4;

  // Skills section
  if (y > 240) {
    doc.addPage();
    y = 20;
  }

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...pine);
  doc.text("Skills", margin, y);
  y += 7;

  // Design skills
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...darkText);
  doc.text("Design Tools", margin, y);
  y += 6;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  DESIGN_SKILLS.forEach((skill) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.text(`${skill.name} - ${skill.note}`, margin, y);
    y += 5;
  });

  y += 4;

  // Communication skills
  if (y > 250) {
    doc.addPage();
    y = 20;
  }

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Communication", margin, y);
  y += 6;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const commText = COMM_SKILLS.join(" • ");
  const commLines = doc.splitTextToSize(commText, pageWidth - 2 * margin);
  doc.text(commLines, margin, y);
  y += commLines.length * 5 + 4;

  // Technical skills
  if (y > 250) {
    doc.addPage();
    y = 20;
  }

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Technical", margin, y);
  y += 6;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const techText = TECH_SKILLS.join(" • ");
  const techLines = doc.splitTextToSize(techText, pageWidth - 2 * margin);
  doc.text(techLines, margin, y);
  y += techLines.length * 5 + 4;

  // Soft skills
  if (y > 250) {
    doc.addPage();
    y = 20;
  }

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Soft Skills", margin, y);
  y += 6;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const softText = SOFT_SKILLS.join(" • ");
  const softLines = doc.splitTextToSize(softText, pageWidth - 2 * margin);
  doc.text(softLines, margin, y);
  y += softLines.length * 5 + 8;

  // Certifications section
  if (y > 240) {
    doc.addPage();
    y = 20;
  }

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...pine);
  doc.text("Certifications & Training", margin, y);
  y += 7;

  CERTS.forEach((cert) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...darkText);
    doc.text(`${cert.year} - ${cert.title}`, margin, y);
    y += 5;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...lightText);
    doc.text(cert.org, margin, y);
    y += 7;
  });

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...lightText);
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }

  // Save the PDF
  doc.save(`${CONTACT.name.replace(/\s+/g, "_")}_CV.pdf`);
}
