import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import {
  Camera,
  CheckCircle,
  Eye,
  Lightbulb,
  Shield,
  ChevronDown,
  ChevronUp,
  Shirt,
  ShoppingBag,
  Glasses,
  //Jacket,
  Crown,
  Heart,
  Zap,
  Baby,
} from "lucide-react";

const VerificationGuide = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const categories = [
    {
      id: "shoes",
      title: "Shoes",
      subtitle: "Sneakers, Trainers, Loafers, Slides, Sandals, Heels, Boots",
      isActive:true,
      icon: (
        <div className="w-6 h-6 bg-visibuy-primary rounded text-white flex items-center justify-center text-xs font-bold">
          👟
        </div>
      ),
      photos: [
        {
          angle: "Side View",
          description: "Show both shoes side-by-side from the outer profile.",
          buyerCheck: "Shape, silhouette, and color consistency.",
        },
        {
          angle: "Sole Close-Up",
          description: "Capture the bottom of one shoe.",
          buyerCheck: "Tread pattern, logo clarity, and signs of wear.",
        },
        {
          angle: "Top-Down View",
          description:
            "Take a shot from above showing laces, tongue, and toe box.",
          buyerCheck: "Structure, lace style, toe box shape.",
        },
        {
          angle: "Logo + Size Label",
          description: "Photograph the size tag inside the shoe.",
          buyerCheck: "Brand authenticity and correct size.",
        },
        {
          angle: "Stitching & Material Close-Up",
          description: "Zoom in on the fabric/leather.",
          buyerCheck: "Stitching precision, texture, and finish quality.",
        },
      ],
    },
    {
      id: "tops",
      title: "Tops",
      subtitle: "T-Shirts, Shirts, Blouses, Polos",
      icon: <Shirt className="w-6 h-6 text-visibuy-primary" />,
      photos: [
        {
          angle: "Front View",
          description: "Flat or hung, clearly showing full front design.",
          buyerCheck: "Design, logo, neckline.",
        },
        {
          angle: "Back View",
          description: "Show entire rear of the top.",
          buyerCheck: "Seam alignment, fabric tone.",
        },
        {
          angle: "Label + Tag",
          description: "Tag inside collar or neckline.",
          buyerCheck: "Brand, size, material info.",
        },
        {
          angle: "Sleeve Close-Up",
          description: "Zoom on one sleeve or cuff.",
          buyerCheck: "Stitching, length, edge details.",
        },
        {
          angle: "Material Close-Up",
          description: "Detailed view of fabric surface.",
          buyerCheck: "Print quality, fabric texture.",
        },
      ],
    },
    {
      id: "bottoms",
      title: "Bottoms",
      subtitle: "Jeans, Trousers, Shorts, Skirts",
      icon: (
        <div className="w-6 h-6 bg-visibuy-primary rounded text-white flex items-center justify-center text-xs font-bold">
          👖
        </div>
      ),
      photos: [
        {
          angle: "Front View",
          description: "Laid flat, waistband to hem fully visible.",
          buyerCheck: "Cut, closure type, color.",
        },
        {
          angle: "Back View",
          description: "Show full rear with pocket details.",
          buyerCheck: "Pocket design, stitch lines.",
        },
        {
          angle: "Waistband + Tag",
          description: "Inside waist label and button area.",
          buyerCheck: "Size, brand, fit.",
        },
        {
          angle: "Zip/Button Detail",
          description: "Close-up of fastening mechanism.",
          buyerCheck: "Functionality, finish.",
        },
        {
          angle: "Hem or Fabric Close-Up",
          description: "Focus on lower edge or texture.",
          buyerCheck: "Wear, stitching, material quality.",
        },
      ],
    },
    {
      id: "dresses",
      title: "Dresses & Gowns",
      subtitle: "All dress styles and formal gowns",
      icon: (
        <div className="w-6 h-6 bg-visibuy-primary rounded text-white flex items-center justify-center text-xs font-bold">
          👗
        </div>
      ),
      photos: [
        {
          angle: "Full Front View",
          description: "Dress displayed fully from top to bottom.",
          buyerCheck: "Design cut, waistline, length.",
        },
        {
          angle: "Back View",
          description: "Rear angle including zipper or back detail.",
          buyerCheck: "Back fit, fastenings.",
        },
        {
          angle: "Label + Tag",
          description: "Inside lining or collar tag.",
          buyerCheck: "Size, brand origin.",
        },
        {
          angle: "Sleeve/Strap Close-Up",
          description: "Zoom on straps, lace, or embroidery.",
          buyerCheck: "Quality of finish and details.",
        },
        {
          angle: "Fabric Close-Up",
          description: "Detailed texture view (e.g. satin, lace).",
          buyerCheck: "Material feel, shine, layering.",
        },
      ],
    },
    {
      id: "accessories",
      title: "Accessories",
      subtitle: "Bags, Belts, Sunglasses, Jewelry",
      icon: <ShoppingBag className="w-6 h-6 text-visibuy-primary" />,
      photos: [
        {
          angle: "Full Product View",
          description: "Show the complete item front-facing.",
          buyerCheck: "General shape and design.",
        },
        {
          angle: "Back or Bottom View",
          description: "Display rear or base of the item.",
          buyerCheck: "Seam strength, structure.",
        },
        {
          angle: "Logo + Tag/Stamp",
          description: "Brand label or engraved marks.",
          buyerCheck: "Authenticity.",
        },
        {
          angle: "Hardware Close-Up",
          description: "Zoom on zips, buckles, fasteners.",
          buyerCheck: "Metal quality, shine.",
        },
        {
          angle: "Material Close-Up",
          description: "Show texture or grain of the item.",
          buyerCheck: "Fabric or leather quality.",
        },
      ],
    },
    {
      id: "outerwear",
      title: "Outerwear",
      subtitle: "Jackets, Hoodies, Coats, Blazers",
      //icon: <Jacket className="w-6 h-6 text-visibuy-primary" />,
      photos: [
        {
          angle: "Front View",
          description: "Display the outerwear fully zipped or buttoned.",
          buyerCheck: "Structure, design, collar style.",
        },
        {
          angle: "Back View",
          description: "Full-length view showing back stitching.",
          buyerCheck: "Fit, back details.",
        },
        {
          angle: "Label + Tag",
          description: "Inside collar or inner pocket tag.",
          buyerCheck: "Brand, size, fabric content.",
        },
        {
          angle: "Sleeve & Cuff Close-Up",
          description: "Zoom on sleeve edges or elastic bands.",
          buyerCheck: "Stitching, wear.",
        },
        {
          angle: "Lining or Fabric Close-Up",
          description: "Interior fabric texture or material surface.",
          buyerCheck: "Warmth, quality.",
        },
      ],
    },
    {
      id: "traditional",
      title: "Traditional/Native Wear",
      subtitle: "Agbada, Senator, Ankara, Kaftan",
      icon: <Crown className="w-6 h-6 text-visibuy-primary" />,
      photos: [
        {
          angle: "Full Front View",
          description: "Display full outfit laid or hung neatly.",
          buyerCheck: "Style, embroidery, cut.",
        },
        {
          angle: "Back View",
          description: "Show rear angle clearly.",
          buyerCheck: "Finishing, symmetry.",
        },
        {
          angle: "Label + Tag",
          description: "Any brand or tailor tag (if available).",
          buyerCheck: "Identity, sizing.",
        },
        {
          angle: "Sleeve or Neckline Detail",
          description: "Zoom on special patterns or embroidery.",
          buyerCheck: "Craftsmanship.",
        },
        {
          angle: "Fabric Close-Up",
          description: "Ankara print, texture, or weave pattern.",
          buyerCheck: "Authenticity, material thickness.",
        },
      ],
    },
    {
      id: "underwear",
      title: "Underwear & Loungewear",
      subtitle: "Boxers, Bras, Nightwear",
      icon: <Heart className="w-6 h-6 text-visibuy-primary" />,
      photos: [
        {
          angle: "Front View",
          description: "Flat display of item, full view.",
          buyerCheck: "Design, cut.",
        },
        {
          angle: "Back View",
          description: "Rear layout for shape and size.",
          buyerCheck: "Support, stretch zones.",
        },
        {
          angle: "Label + Tag",
          description: "Inner label for brand and size.",
          buyerCheck: "Fit info, fabric type.",
        },
        {
          angle: "Strap/Waistband Detail",
          description: "Zoom on elastic or clasp area.",
          buyerCheck: "Durability.",
        },
        {
          angle: "Material Close-Up",
          description: "Softness, mesh, or cotton texture.",
          buyerCheck: "Comfort level.",
        },
      ],
    },
    {
      id: "sportswear",
      title: "Sportswear/Activewear",
      subtitle: "Gym Sets, Jerseys, Tracksuits",
      icon: <Zap className="w-6 h-6 text-visibuy-primary" />,
      photos: [
        {
          angle: "Full Front View",
          description: "Top and bottom (if set) or jersey laid flat.",
          buyerCheck: "Style, team logos, fit.",
        },
        {
          angle: "Back View",
          description: "Name/number or plain back view.",
          buyerCheck: "Design match.",
        },
        {
          angle: "Label + Tag",
          description: "Inner neck or waistband tag.",
          buyerCheck: "Brand, size.",
        },
        {
          angle: "Sleeve or Leg Detail",
          description: "Close-up of stretch fabric or design lines.",
          buyerCheck: "Flexibility.",
        },
        {
          angle: "Material Close-Up",
          description: "Fabric texture (e.g., dry-fit).",
          buyerCheck: "Breathability, performance.",
        },
      ],
    },
    {
      id: "kidswear",
      title: "Kidswear",
      subtitle: "All child fashion items",
      icon: <Baby className="w-6 h-6 text-visibuy-primary" />,
      photos: [
        {
          angle: "Full Front View",
          description: "Garment laid flat or on hanger.",
          buyerCheck: "Pattern, cut.",
        },
        {
          angle: "Back View",
          description: "Display full rear clearly.",
          buyerCheck: "Closure type, stitching.",
        },
        {
          angle: "Label + Tag",
          description: "Size and brand inside.",
          buyerCheck: "Age group match.",
        },
        {
          angle: "Sleeve/Leg Detail",
          description: "Zoom on cuff or hem.",
          buyerCheck: "Comfort, durability.",
        },
        {
          angle: "Fabric Close-Up",
          description: "Softness and texture visible.",
          buyerCheck: "Skin-friendliness.",
        },
      ],
    },
  ];

  const photoTips = [
    "Use natural or bright white light",
    "Photograph on a plain white or neutral background",
    "Ensure item is clean, flat, and centered",
    "Avoid filters, editing, or blurring",
  ];

  const buyerReminders = [
    "Review all 5 uploaded angles carefully",
    "Compare photos to the original product listing",
    "Approve only when size, style, and quality match expectations",
    'Use the "Approve" or "Cancel" button to confirm',
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-visibuy-primary/5 to-visibuy-green/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-visibuy-green text-white">
                VERIFICATION GUIDE
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-visibuy-dark-gray mb-6">
                Fashion Verification Guide
              </h1>
              <p className="text-xl text-visibuy-dark-gray/80 mb-8">
                Your 5-Angle Photo Checklist for Accurate Orders
              </p>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Camera className="w-6 h-6 text-visibuy-green" />
                  <span className="text-lg font-semibold text-visibuy-dark-gray">
                    "What you see is what you get."
                  </span>
                </div>
                <p className="text-visibuy-dark-gray/70">
                  Visibuy protects your trust by making visual verification the
                  standard. Every angle matters.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-visibuy-dark-gray mb-8 text-center">
                Fashion Categories
              </h2>

              <div className="space-y-4">
                {categories.map((category) => (
                  <Card key={category.id} className="overflow-hidden">
                    <CardHeader
                      className="cursor-pointer hover:bg-visibuy-light-shade/30 transition-colors"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {category.icon}
                          <div>
                            <CardTitle className="text-xl text-visibuy-dark-gray">
                              {category.title}
                            </CardTitle>
                            <CardDescription className="text-visibuy-dark-gray/60">
                              {category.subtitle}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center flex-col gap-2">
                          {!category.isActive && <div>Coming sooon</div>}
                          <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="border-visibuy-green text-visibuy-green"
                          >
                            5 Photos Required
                          </Badge>
                          {expandedCategory === category.id ? (
                            <ChevronUp className="w-5 h-5 text-visibuy-dark-gray" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-visibuy-dark-gray" />
                          )}
                          </div>
                         
                        </div>
                      </div>
                    </CardHeader>

                    {expandedCategory === category.id && (
                      <CardContent className="pt-0">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {category.photos.map((photo, index) => (
                            <div
                              key={index}
                              className="bg-visibuy-light-shade/20 rounded-lg p-4"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 bg-visibuy-green text-white rounded-full flex items-center justify-center text-sm font-bold">
                                  {index + 1}
                                </div>
                                <h4 className="font-semibold text-visibuy-dark-gray">
                                  {photo.angle}
                                </h4>
                              </div>
                              <p className="text-sm text-visibuy-dark-gray/70 mb-2">
                                {photo.description}
                              </p>
                              <div className="flex items-start gap-2">
                                <Eye className="w-4 h-4 text-visibuy-green mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-visibuy-green font-medium">
                                  Buyer checks: {photo.buyerCheck}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 bg-visibuy-light-shade/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Seller Tips */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Lightbulb className="w-6 h-6 text-visibuy-green" />
                      <CardTitle className="text-visibuy-dark-gray">
                        Seller Photo Tips
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {photoTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-visibuy-green mt-0.5 flex-shrink-0" />
                          <span className="text-visibuy-dark-gray/80">
                            {tip}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Buyer Reminders */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6 text-visibuy-green" />
                      <CardTitle className="text-visibuy-dark-gray">
                        Buyer Verification Reminders
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {buyerReminders.map((reminder, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-visibuy-green mt-0.5 flex-shrink-0" />
                          <span className="text-visibuy-dark-gray/80">
                            {reminder}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-visibuy-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Selling or Buying?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who trust Visibuy for authentic fashion
              verification
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-visibuy-green hover:bg-white/90"
              >
                Start Selling
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-visibuy-green"
              >
                Start Shopping
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VerificationGuide;
