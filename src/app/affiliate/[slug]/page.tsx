import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { FaShieldAlt, FaAmbulance, FaUserMd, FaIdCard } from 'react-icons/fa';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AffiliateLandingPage({ params }: Props) {
  const resolvedParams = await params;
  const affiliate = await prisma.affiliate.findUnique({
    where: { 
      slug: resolvedParams.slug,
      isActive: true,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        }
      }
    }
  });

  if (!affiliate) {
    notFound();
  }

  // Track visit
  await prisma.affiliate.update({
    where: { id: affiliate.id },
    data: { visits: { increment: 1 } }
  });

  const primaryColor = affiliate.primaryColor || '#245789';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative py-24 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: `${primaryColor}10` }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {affiliate.logoUrl && (
              <Image
                src={affiliate.logoUrl}
                alt={affiliate.companyName || 'Partner'}
                width={200}
                height={100}
                className="mx-auto mb-8"
              />
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {affiliate.heroHeading || 'Your Emergency Information When It Matters Most'}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {affiliate.heroSubtext || 'ICE Tracer provides instant access to critical medical information during emergencies'}
            </p>
            <Link
              href={`/auth/signup?ref=${affiliate.slug}`}
              className="inline-block px-8 py-4 text-lg font-semibold text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: primaryColor }}
            >
              {affiliate.ctaText || 'Get ICE Tracer Today'}
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose ICE Tracer?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${primaryColor}20` }}
              >
                <FaShieldAlt className="w-8 h-8" style={{ color: primaryColor }} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Always Protected</h3>
              <p className="text-gray-600">
                Your medical information is securely stored and instantly accessible
              </p>
            </div>
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${primaryColor}20` }}
              >
                <FaAmbulance className="w-8 h-8" style={{ color: primaryColor }} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Emergency Ready</h3>
              <p className="text-gray-600">
                First responders can access your critical information in seconds
              </p>
            </div>
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${primaryColor}20` }}
              >
                <FaUserMd className="w-8 h-8" style={{ color: primaryColor }} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Medical Details</h3>
              <p className="text-gray-600">
                Store medications, allergies, conditions, and emergency contacts
              </p>
            </div>
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${primaryColor}20` }}
              >
                <FaIdCard className="w-8 h-8" style={{ color: primaryColor }} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Access</h3>
              <p className="text-gray-600">
                QR code and ID number provide instant access to your profile
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Section */}
      {(affiliate.bio || affiliate.companyName) && (
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Recommended by {affiliate.companyName || affiliate.user.name}
            </h2>
            {affiliate.bio && (
              <p className="text-lg text-gray-600 mb-8">
                {affiliate.bio}
              </p>
            )}
            {affiliate.website && (
              <a
                href={affiliate.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Learn more about {affiliate.companyName}
              </a>
            )}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div 
        className="py-16 px-4 sm:px-6 lg:px-8 text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Protect Your Emergency Information?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands who trust ICE Tracer for their emergency medical information
          </p>
          <Link
            href={`/auth/signup?ref=${affiliate.slug}`}
            className="inline-block px-8 py-4 text-lg font-semibold bg-white rounded-lg shadow-lg hover:shadow-xl transition-all"
            style={{ color: primaryColor }}
          >
            {affiliate.ctaText || 'Get Started Now'}
          </Link>
        </div>
      </div>
    </div>
  );
}