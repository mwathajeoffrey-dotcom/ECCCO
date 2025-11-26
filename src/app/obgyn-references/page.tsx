'use client';

import { BookOpen, ExternalLink, ChevronLeft, Calendar, Award } from 'lucide-react';
import Link from 'next/link';

export default function OBGYNReferencesPage() {
  const guidelines = [
    {
      category: "Cardiovascular Disease",
      topics: ["Cardiac Disease in Pregnancy"],
      guidelines: [
        {
          name: "ESC Guidelines 2023/2024",
          organization: "European Society of Cardiology",
          description: "Cardiovascular disease and pregnancy management",
          year: "2023-2024",
          link: "https://www.escardio.org/Guidelines"
        },
        {
          name: "ACC/AHA 2024",
          organization: "American College of Cardiology / American Heart Association",
          description: "Management of cardiovascular disease during pregnancy",
          year: "2024",
          link: "https://www.acc.org/guidelines"
        },
        {
          name: "CARPREG Risk Score",
          organization: "Canadian Cardiovascular Society",
          description: "Validated cardiac risk assessment tool",
          year: "Updated 2024",
          link: "https://www.ccs.ca"
        }
      ]
    },
    {
      category: "Endocrine Disorders",
      topics: ["Diabetes in Pregnancy", "Thyroid Disorders in Pregnancy"],
      guidelines: [
        {
          name: "ADA 2025 Standards of Care",
          organization: "American Diabetes Association",
          description: "Comprehensive diabetes management in pregnancy including GDM screening, glucose targets (HbA1c <6.0%), and insulin protocols",
          year: "2025",
          link: "https://diabetesjournals.org/care/issue/48/Supplement_1"
        },
        {
          name: "ATA 2024 Guidelines",
          organization: "American Thyroid Association",
          description: "Thyroid disease and pregnancy management, pregnancy-specific TSH ranges (T1: 0.1-2.5, T2: 0.2-3.0, T3: 0.3-3.0 mIU/L)",
          year: "2024",
          link: "https://www.thyroid.org/professionals/ata-professional-guidelines/"
        },
        {
          name: "Endocrine Society 2024",
          organization: "Endocrine Society",
          description: "Clinical practice guidelines for endocrine disorders in pregnancy",
          year: "2024",
          link: "https://www.endocrine.org/clinical-practice-guidelines"
        }
      ]
    },
    {
      category: "Hypertensive Disorders",
      topics: ["Hypertensive Disorders in Pregnancy"],
      guidelines: [
        {
          name: "CHAP Trial 2022",
          organization: "NIH-funded multicenter trial",
          description: "LANDMARK STUDY: Changed practice from 150-160/100-110 to treat chronic HTN ≥140/90, target 130-135/80-85 WITHOUT increasing FGR",
          year: "2022",
          link: "https://www.nejm.org/doi/full/10.1056/NEJMoa2201295"
        },
        {
          name: "AHA/ACC 2024",
          organization: "American Heart Association / American College of Cardiology",
          description: "Hypertension management in pregnancy",
          year: "2024",
          link: "https://www.ahajournals.org/hypertension"
        },
        {
          name: "ISSHP 2024 Guidelines",
          organization: "International Society for the Study of Hypertension in Pregnancy",
          description: "Classification and diagnosis of hypertensive disorders in pregnancy",
          year: "2024",
          link: "https://www.isshp.org"
        }
      ]
    },
    {
      category: "Hematologic & Thrombotic Disorders",
      topics: ["Thromboembolism in Pregnancy", "Hematologic Disorders in Pregnancy"],
      guidelines: [
        {
          name: "ASH 2024 Guidelines",
          organization: "American Society of Hematology",
          description: "Comprehensive guidelines for VTE prevention, ITP management, sickle cell disease, and transfusion medicine",
          year: "2024",
          link: "https://www.hematology.org/education/clinicians/guidelines-and-quality-care"
        },
        {
          name: "ASRA 2024",
          organization: "American Society of Regional Anesthesia and Pain Medicine",
          description: "Neuraxial anesthesia timing with anticoagulation: prophylactic LMWH hold 12 hours, therapeutic hold 24 hours",
          year: "2024",
          link: "https://www.asra.com/guidelines-articles/guidelines"
        },
        {
          name: "Revised Sydney Criteria 2023",
          organization: "International consensus",
          description: "Updated diagnostic criteria for antiphospholipid syndrome",
          year: "2023",
          link: "https://ard.bmj.com/content/early/2023/07/25/ard-2023-224609"
        },
        {
          name: "ACCP 2021",
          organization: "American College of Chest Physicians",
          description: "Antithrombotic therapy in pregnancy",
          year: "2021",
          link: "https://journal.chestnet.org/"
        },
        {
          name: "NHLBI 2024",
          organization: "National Heart, Lung, and Blood Institute",
          description: "Transfusion medicine and hematologic disorders",
          year: "2024",
          link: "https://www.nhlbi.nih.gov"
        }
      ]
    },
    {
      category: "Infectious Disease",
      topics: ["Infectious Disease in Pregnancy"],
      guidelines: [
        {
          name: "CDC 2024 Guidelines",
          organization: "Centers for Disease Control and Prevention",
          description: "Universal Hepatitis C screening, updated GBS prophylaxis protocols, vaccination schedules",
          year: "2024",
          link: "https://www.cdc.gov/pregnancy"
        },
        {
          name: "NIH 2024 Perinatal HIV Guidelines",
          organization: "National Institutes of Health",
          description: "U=U concept (Undetectable=Untransmittable): <0.1% transmission with ART and viral suppression",
          year: "2024",
          link: "https://clinicalinfo.hiv.gov/en/guidelines/perinatal"
        },
        {
          name: "WHO 2024",
          organization: "World Health Organization",
          description: "Global infectious disease recommendations in pregnancy",
          year: "2024",
          link: "https://www.who.int/publications"
        }
      ]
    },
    {
      category: "Renal Disease",
      topics: ["Renal Disease in Pregnancy"],
      guidelines: [
        {
          name: "KDIGO 2024",
          organization: "Kidney Disease: Improving Global Outcomes",
          description: "Chronic kidney disease in pregnancy, dialysis intensification strategies (≥20 hours/week improves live birth from 40-50% to 85-90%)",
          year: "2024",
          link: "https://kdigo.org/guidelines/"
        },
        {
          name: "ASN 2024",
          organization: "American Society of Nephrology",
          description: "Pregnancy in women with kidney disease",
          year: "2024",
          link: "https://www.asn-online.org"
        }
      ]
    },
    {
      category: "General OB/GYN",
      topics: ["All Topics"],
      guidelines: [
        {
          name: "ACOG Practice Bulletins",
          organization: "American College of Obstetricians and Gynecologists",
          description: "Comprehensive clinical guidance across all pregnancy complications",
          year: "2020-2025",
          link: "https://www.acog.org/clinical-information/practice-bulletins"
        },
        {
          name: "RCOG Green-top Guidelines",
          organization: "Royal College of Obstetricians and Gynaecologists",
          description: "Evidence-based guidelines for obstetric and gynecologic care",
          year: "2020-2025",
          link: "https://www.rcog.org.uk/guidance/browse-all-guidance/"
        },
        {
          name: "SMFM Consults",
          organization: "Society for Maternal-Fetal Medicine",
          description: "Clinical guidance for high-risk pregnancy management",
          year: "2020-2025",
          link: "https://www.smfm.org/publications"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/exam" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Exam
          </Link>
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Clinical Guidelines & References</h1>
              <p className="text-gray-600 mt-1">2024-2025 Evidence-Based Guidelines for Medical Comorbidities in Pregnancy</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Award className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Evidence-Based Excellence</h2>
              <p className="text-gray-700 mb-3">
                All 240 new medical comorbidity questions incorporate the most current clinical guidelines from 18+ major clinical organizations. 
                Each question includes 3-4 references from 2023-2025 publications, specific numerical data, and landmark trial results.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">240</div>
                  <div className="text-sm text-gray-600">New Questions</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">18+</div>
                  <div className="text-sm text-gray-600">Organizations</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-pink-200">
                  <div className="text-2xl font-bold text-pink-600">2024-25</div>
                  <div className="text-sm text-gray-600">Current Guidelines</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guidelines by Category */}
        {guidelines.map((category, idx) => (
          <div key={idx} className="mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">{category.category}</h3>
                <p className="text-blue-100 text-sm mt-1">
                  Topics: {category.topics.join(", ")}
                </p>
              </div>
              
              <div className="p-6 space-y-4">
                {category.guidelines.map((guideline, gIdx) => (
                  <div key={gIdx} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{guideline.name}</h4>
                          <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                            <Calendar className="w-3 h-3" />
                            {guideline.year}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{guideline.organization}</p>
                        <p className="text-gray-700">{guideline.description}</p>
                      </div>
                      <a
                        href={guideline.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        View
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white mt-12">
          <h3 className="text-2xl font-bold mb-3">Ready to Test Your Knowledge?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Apply these evidence-based guidelines with 480 comprehensive OB/GYN questions covering emergencies and medical comorbidities.
          </p>
          <Link
            href="/exam"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Start Practicing →
          </Link>
        </div>
      </main>
    </div>
  );
}
