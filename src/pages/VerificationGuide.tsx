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
  ChevronDown,
  ChevronRight,
  Camera,
  Check,
  AlertCircle,
  Shirt,
  Package,
  User,
  Glasses,
  Smartphone,
  Wifi,
  Home,
  Sparkles,
  ChefHat,
  ChevronUp,
  CheckCircle,
  Shield,
  Lightbulb,
  Bell,
} from "lucide-react";

const VerificationGuide = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const categories = [
    {
      id: "shoes",
      title: "👟 SHOES",
      subtitle: "Sneakers, Trainers, Loafers, Slides, Sandals, Heels, Boots",
      icon: Package,
      isActive: true,
      steps: [
        {
          title: "Side View",
          description: "Show both shoes side-by-side from the outer profile.",
          buyerCheck: "Shape, silhouette, and color consistency.",
        },
        {
          title: "Sole Close-Up",
          description: "Capture the bottom of one shoe.",
          buyerCheck: "Tread pattern, logo clarity, and signs of wear.",
        },
        {
          title: "Top-Down View",
          description:
            "Take a shot from above showing laces, tongue, and toe box.",
          buyerCheck: "Structure, lace style, toe box shape.",
        },
        {
          title: "Logo + Size Label",
          description: "Photograph the size tag inside the shoe.",
          buyerCheck: "Brand authenticity and correct size.",
        },
        {
          title: "Stitching & Material Close-Up",
          description: "Zoom in on the fabric/leather.",
          buyerCheck: "Stitching precision, texture, and finish quality.",
        },
      ],
    },
    {
      id: "tops",
      title: "👕 TOPS",
      subtitle: "T-Shirts, Shirts, Blouses, Polos",
      icon: Shirt,
      steps: [
        {
          title: "Front View",
          description: "Flat or hung, clearly showing full front design.",
          buyerCheck: "Design, logo, neckline.",
        },
        {
          title: "Back View",
          description: "Show entire rear of the top.",
          buyerCheck: "Seam alignment, fabric tone.",
        },
        {
          title: "Label + Tag",
          description: "Tag inside collar or neckline.",
          buyerCheck: "Brand, size, material info.",
        },
        {
          title: "Sleeve Close-Up",
          description: "Zoom on one sleeve or cuff.",
          buyerCheck: "Stitching, length, edge details.",
        },
        {
          title: "Material Close-Up",
          description: "Detailed view of fabric surface.",
          buyerCheck: "Print quality, fabric texture.",
        },
      ],
    },
    {
      id: "bottoms",
      title: "👖 BOTTOMS",
      subtitle: "Jeans, Trousers, Shorts, Skirts",
      icon: Package,
      steps: [
        {
          title: "Front View",
          description: "Laid flat, waistband to hem fully visible.",
          buyerCheck: "Cut, closure type, color.",
        },
        {
          title: "Back View",
          description: "Show full rear with pocket details.",
          buyerCheck: "Pocket design, stitch lines.",
        },
        {
          title: "Waistband + Tag",
          description: "Inside waist label and button area.",
          buyerCheck: "Size, brand, fit.",
        },
        {
          title: "Zip/Button Detail",
          description: "Close-up of fastening mechanism.",
          buyerCheck: "Functionality, finish.",
        },
        {
          title: "Hem or Fabric Close-Up",
          description: "Focus on lower edge or texture.",
          buyerCheck: "Wear, stitching, material quality.",
        },
      ],
    },
    {
      id: "dresses",
      title: "👗 DRESSES & GOWNS",
      subtitle: "All dress styles and formal wear",
      icon: Shirt,
      steps: [
        {
          title: "Full Front View",
          description: "Dress displayed fully from top to bottom.",
          buyerCheck: "Design cut, waistline, length.",
        },
        {
          title: "Back View",
          description: "Rear angle including zipper or back detail.",
          buyerCheck: "Back fit, fastenings.",
        },
        {
          title: "Label + Tag",
          description: "Inside lining or collar tag.",
          buyerCheck: "Size, brand origin.",
        },
        {
          title: "Sleeve/Strap Close-Up",
          description: "Zoom on straps, lace, or embroidery.",
          buyerCheck: "Quality of finish and details.",
        },
        {
          title: "Fabric Close-Up",
          description: "Detailed texture view (e.g. satin, lace).",
          buyerCheck: "Material feel, shine, layering.",
        },
      ],
    },
    {
      id: "accessories",
      title: "👜 ACCESSORIES",
      subtitle: "Bags, Belts, Sunglasses, Jewelry, etc.",
      icon: Glasses,
      steps: [
        {
          title: "Full Product View",
          description: "Show the complete item front-facing.",
          buyerCheck: "General shape and design.",
        },
        {
          title: "Back or Bottom View",
          description: "Display rear or base of the item.",
          buyerCheck: "Seam strength, structure.",
        },
        {
          title: "Logo + Tag/Stamp",
          description: "Brand label or engraved marks.",
          buyerCheck: "Authenticity.",
        },
        {
          title: "Hardware Close-Up",
          description: "Zoom on zips, buckles, fasteners.",
          buyerCheck: "Metal quality, shine.",
        },
        {
          title: "Material Close-Up",
          description: "Show texture or grain of the item.",
          buyerCheck: "Fabric or leather quality.",
        },
      ],
    },
    {
      id: "outerwear",
      title: "🧥 OUTERWEAR",
      subtitle: "Jackets, Hoodies, Coats, Blazers",
      icon: Shirt,
      steps: [
        {
          title: "Front View",
          description: "Display the outerwear fully zipped or buttoned.",
          buyerCheck: "Structure, design, collar style.",
        },
        {
          title: "Back View",
          description: "Full-length view showing back stitching.",
          buyerCheck: "Fit, back details.",
        },
        {
          title: "Label + Tag",
          description: "Inside collar or inner pocket tag.",
          buyerCheck: "Brand, size, fabric content.",
        },
        {
          title: "Sleeve & Cuff Close-Up",
          description: "Zoom on sleeve edges or elastic bands.",
          buyerCheck: "Stitching, wear.",
        },
        {
          title: "Lining or Fabric Close-Up",
          description: "Interior fabric texture or material surface.",
          buyerCheck: "Warmth, quality.",
        },
      ],
    },
    {
      id: "traditional",
      title: "🧵 TRADITIONAL / NATIVE WEAR",
      subtitle: "Agbada, Senator, Ankara, Kaftan",
      icon: Shirt,
      steps: [
        {
          title: "Full Front View",
          description: "Display full outfit laid or hung neatly.",
          buyerCheck: "Style, embroidery, cut.",
        },
        {
          title: "Back View",
          description: "Show rear angle clearly.",
          buyerCheck: "Finishing, symmetry.",
        },
        {
          title: "Label + Tag",
          description: "Any brand or tailor tag (if available).",
          buyerCheck: "Identity, sizing.",
        },
        {
          title: "Sleeve or Neckline Detail",
          description: "Zoom on special patterns or embroidery.",
          buyerCheck: "Craftsmanship.",
        },
        {
          title: "Fabric Close-Up",
          description: "Ankara print, texture, or weave pattern.",
          buyerCheck: "Authenticity, material thickness.",
        },
      ],
    },
    {
      id: "underwear",
      title: "🩳 UNDERWEAR & LOUNGEWEAR",
      subtitle: "Boxers, Bras, Nightwear",
      icon: Shirt,
      steps: [
        {
          title: "Front View",
          description: "Flat display of item, full view.",
          buyerCheck: "Design, cut.",
        },
        {
          title: "Back View",
          description: "Rear layout for shape and size.",
          buyerCheck: "Support, stretch zones.",
        },
        {
          title: "Label + Tag",
          description: "Inner label for brand and size.",
          buyerCheck: "Fit info, fabric type.",
        },
        {
          title: "Strap/Waistband Detail",
          description: "Zoom on elastic or clasp area.",
          buyerCheck: "Durability.",
        },
        {
          title: "Material Close-Up",
          description: "Softness, mesh, or cotton texture.",
          buyerCheck: "Comfort level.",
        },
      ],
    },
    {
      id: "sportswear",
      title: "🏃 SPORTSWEAR / ACTIVEWEAR",
      subtitle: "Gym Sets, Jerseys, Tracksuits",
      icon: Shirt,
      steps: [
        {
          title: "Full Front View",
          description: "Top and bottom (if set) or jersey laid flat.",
          buyerCheck: "Style, team logos, fit.",
        },
        {
          title: "Back View",
          description: "Name/number or plain back view.",
          buyerCheck: "Design match.",
        },
        {
          title: "Label + Tag",
          description: "Inner neck or waistband tag.",
          buyerCheck: "Brand, size.",
        },
        {
          title: "Sleeve or Leg Detail",
          description: "Close-up of stretch fabric or design lines.",
          buyerCheck: "Flexibility.",
        },
        {
          title: "Material Close-Up",
          description: "Fabric texture (e.g., dry-fit).",
          buyerCheck: "Breathability, performance.",
        },
      ],
    },
    {
      id: "kidswear",
      title: "🧒 KIDSWEAR",
      subtitle: "All child fashion items",
      icon: User,
      steps: [
        {
          title: "Full Front View",
          description: "Garment laid flat or on hanger.",
          buyerCheck: "Pattern, cut.",
        },
        {
          title: "Back View",
          description: "Display full rear clearly.",
          buyerCheck: "Closure type, stitching.",
        },
        {
          title: "Label + Tag",
          description: "Size and brand inside.",
          buyerCheck: "Age group match.",
        },
        {
          title: "Sleeve/Leg Detail",
          description: "Zoom on cuff or hem.",
          buyerCheck: "Comfort, durability.",
        },
        {
          title: "Fabric Close-Up",
          description: "Softness and texture visible.",
          buyerCheck: "Skin-friendliness.",
        },
      ],
    },
    {
      id: "wigs",
      title: "👩🏽‍🦱 WIGS & HAIR EXTENSIONS",
      subtitle: "Wigs, Bundles, Closures, Frontals",
      icon: User,
      steps: [
        {
          title: "Full Product View",
          description: "Wig or bundle displayed on a head model or mannequin.",
          buyerCheck: "Style, length, volume.",
        },
        {
          title: "Lace or Cap Close-Up",
          description: "Zoom into the lace or wig cap interior.",
          buyerCheck: "Lace type (HD, transparent), stitching, parting space.",
        },
        {
          title: "Texture & Strand Close-Up",
          description: "A zoomed view of the strands/fibers.",
          buyerCheck: "Curl pattern, color tone, smoothness.",
        },
        {
          title: "Hairline or Front View",
          description: "Close-up of the hairline or frontal area.",
          buyerCheck: "Pre-plucked edges, density, baby hairs.",
        },
        {
          title: "Length Measurement or Tag",
          description: "Show measuring tape from base to end.",
          buyerCheck: "Length accuracy.",
        },
      ],
    },
    {
      id: "swimwear",
      title: "👙 SWIMWEAR",
      subtitle: "Bikinis, One-Piece, Swim Trunks, Tankinis",
      icon: Shirt,
      steps: [
        {
          title: "Full Front View",
          description: "Show the entire piece laid flat or hung.",
          buyerCheck: "Style, color, neckline, and overall cut.",
        },
        {
          title: "Back View",
          description: "Display the back including straps or coverage.",
          buyerCheck: "Strap design, coverage level, support features.",
        },
        {
          title: "Interior Lining / Padding View",
          description: "Zoom in on inside lining or bra cups.",
          buyerCheck: "Hygiene lining, support padding, removable inserts.",
        },
        {
          title: "Tag & Size Label",
          description: "Show brand, size, fabric, and care details.",
          buyerCheck: "Size accuracy, brand authenticity.",
        },
        {
          title: "Fabric & Stitching Close-Up",
          description: "Zoom into material (especially around seams).",
          buyerCheck: "Stretch quality, stitching strength, potential wear.",
        },
      ],
    },
    {
      id: "scarves",
      title: "🧣 SCARVES & HIJABS",
      subtitle: "Scarves, Shawls, Hijabs, Veils",
      icon: Shirt,
      steps: [
        {
          title: "Full Laid-Out View",
          description: "Display item fully spread to show shape and size.",
          buyerCheck: "Length, width, edge finish.",
        },
        {
          title: "Folded or Draped Look",
          description: "Show item folded or styled on mannequin (or hanger).",
          buyerCheck: "Drape style, weight, thickness.",
        },
        {
          title: "Label or Tag",
          description: "Zoom in on tag or stamp.",
          buyerCheck: "Brand, size, material type.",
        },
        {
          title: "Fabric Texture Close-Up",
          description: "Macro shot of the fabric.",
          buyerCheck: "Sheerness, pattern weave, softness.",
        },
        {
          title: "Edge Detailing",
          description: "Close-up of corners or hemming.",
          buyerCheck: "Seam finish, frays, border style.",
        },
      ],
    },
    {
      id: "headwear",
      title: "👒 HEADWEAR",
      subtitle: "Caps, Hats, Beanies, Turbans, Berets, Headbands",
      icon: Package,
      steps: [
        {
          title: "Full Front View",
          description:
            "Display headwear facing forward, upright or worn on a mannequin.",
          buyerCheck:
            "Shape, color, front design/logo, brim or crown structure.",
        },
        {
          title: "Back View",
          description:
            "Show the back to reveal fasteners, elastic, or closure style.",
          buyerCheck:
            "Adjustability, closure type (snap, Velcro, elastic), stitching.",
        },
        {
          title: "Interior Label or Tag",
          description: "Show inside label with brand, size, and material.",
          buyerCheck: "Authenticity, size details, fabric content.",
        },
        {
          title: "Material & Texture Close-Up",
          description: "Zoom in on the outer fabric texture.",
          buyerCheck: "Wool, cotton, synthetic, weave or knit pattern.",
        },
        {
          title: "Stitching or Hardware Detail",
          description:
            "Focus on brim edges, buttons, logos, or embellishments.",
          buyerCheck: "Build quality, brand elements, signs of wear (if used).",
        },
      ],
    },
    {
      id: "electronics",
      title: "🔌 ELECTRONICS & GADGETS",
      subtitle:
        "Phones, Laptops, Tablets, TVs, Speakers, Consoles, Earbuds, Smartwatches",
      icon: Smartphone,
      steps: [
        {
          title: "Front View (Screen/Face)",
          description:
            "New: Show item inside box (optional transparent wrap if sealed). Used: Display the screen turned off, showing any scratches or wear.",
          buyerCheck: "Display size, scratch level, front design, cleanliness.",
        },
        {
          title: "Back/Rear View",
          description: "Show the full back of the device clearly.",
          buyerCheck:
            "Camera placement, branding, casing condition (dents, cracks).",
        },
        {
          title: "Power-On or Seal Proof",
          description:
            "New: Show box seal (unbroken), factory sticker, or packaging date. Used: Turn on the item; show home screen, boot-up screen, or software info.",
          buyerCheck: "Authenticity, functional condition, screen quality.",
        },
        {
          title: "Ports + Button Close-Up",
          description:
            "Zoom in on charging ports, headphone jacks, buttons, or card slots.",
          buyerCheck: "Wear, cleanliness, functionality, damage.",
        },
        {
          title: "Model, IMEI or Serial Tag",
          description:
            "Show 'About' screen or external sticker with model number/IMEI.",
          buyerCheck: "Authenticity, exact model, version match with listing.",
        },
      ],
    },
    {
      id: "appliances",
      title: "🏠 HOME APPLIANCES",
      subtitle:
        "Refrigerators, Microwaves, Blenders, Washing Machines, Air Conditioners, Cookers",
      icon: Home,
      steps: [
        {
          title: "Full Front View",
          description:
            "Show the entire appliance from the front, including brand logo.",
          buyerCheck: "General design, size, door condition, control layout.",
        },
        {
          title: "Rear or Side View",
          description: "Capture the back panel or side vents.",
          buyerCheck: "Ventilation grills, power cord, plug condition, wear.",
        },
        {
          title: "Interior View",
          description:
            "Open the door/lid and show inside (e.g., fridge shelves, blender jar, washer drum).",
          buyerCheck: "Cleanliness, functionality, internal damage or rust.",
        },
        {
          title: "Power-On or Control Panel Close-Up",
          description:
            "New: Show protective film or display panel untouched. Used: Turn on and show display lights, timer screen, etc.",
          buyerCheck:
            "Operational status, control clarity, interface usability.",
        },
        {
          title: "Model & Spec Label",
          description:
            "Show manufacturer label or engraved plate (usually at back or side).",
          buyerCheck: "Brand, voltage, capacity, model number, authenticity.",
        },
      ],
    },
    {
      id: "beauty",
      title: "💄 BEAUTY & COSMETICS",
      subtitle: "Makeup, Skincare, Perfume, Haircare, Nail Products",
      icon: Sparkles,
      steps: [
        {
          title: "Full Product View (Front)",
          description:
            "Show the full product front-facing with branding and label clearly visible.",
          buyerCheck: "Packaging design, brand name, size, label clarity.",
        },
        {
          title: "Seal / Tamper-Proof Check",
          description:
            "Capture any seal — shrink wrap, foil, sticker, or box closure.",
          buyerCheck: "Hygiene protection, unopened condition, authenticity.",
        },
        {
          title: "Back or Ingredient Label",
          description:
            "Photograph the back or side with ingredients, usage info, manufacture/expiry date.",
          buyerCheck:
            "Product legitimacy, allergy risks, shelf life, usage instructions.",
        },
        {
          title: "Texture, Nozzle, or Surface View",
          description:
            "For makeup/skincare: show texture or visible surface. For perfume: show nozzle, cap, or bottle top.",
          buyerCheck:
            "Consistency, color, dispenser type, visible surface quality.",
        },
        {
          title: "Batch Code or Barcode",
          description:
            "Capture the batch number, serial ID, or barcode on packaging (bottom or side).",
          buyerCheck:
            "Authenticity confirmation, cross-check with listing, warranty claims.",
        },
      ],
    },
    {
      id: "kitchenware",
      title: "🍽 KITCHENWARE & TABLEWARE",
      subtitle:
        "Pots, Pans, Dishes, Utensils, Mugs, Glasses, Cutlery, Containers",
      icon: ChefHat,
      steps: [
        {
          title: "Full Set or Group View",
          description:
            "Show all included items laid out together clearly (if it's a set).",
          buyerCheck: "Completeness, size comparison, surface wear.",
        },
        {
          title: "Individual Item Front View",
          description:
            "Display the front or angled view of one item (e.g. pot, plate, mug).",
          buyerCheck: "General design, pattern, shape, and color.",
        },
        {
          title: "Interior or Base Close-Up",
          description:
            "For pots, pans, cups, containers: show the interior or base. For plates, trays: show underside or edge finish.",
          buyerCheck:
            "Condition (scratches, stains), non-stick layer, durability.",
        },
        {
          title: "Handle / Rim / Edge Detail",
          description: "Zoom in on handle (if present) or rim/lip/edges.",
          buyerCheck: "Cracks, chips, heat damage, material quality.",
        },
        {
          title: "Logo, Stamp or Label",
          description:
            "Capture any brand engravings, heat stamps, product labels, or barcode tags.",
          buyerCheck:
            "Authenticity, brand origin, dishwasher/microwave-safe info, model.",
        },
      ],
    },
    {
      id: "sportequipment",
      title: "🏋 SPORTS EQUIPMENT",
      subtitle:
        "Dumbbells, Yoga Mats, Bikes, Treadmills, Rackets, Balls, Gloves, Skates, etc.",
      icon: Bell,
      steps: [
        {
          title: "Full Product View (Front/Assembled)",
          description:
            "Show the complete item in a well-lit shot. For large items, show it in its intended form (e.g., bike fully assembled, treadmill open).",
          buyerCheck: "Overall size, design, brand visibility, completeness.",
        },
        {
          title: "Side/Back View",
          description: "Capture the rear or profile of the equipment.",
          buyerCheck: "Structure, balance, wear/tear, attachments.",
        },
        {
          title: "Close-Up of Functional Parts",
          description:
            "Highlight key components — wheels, grips, pedals, weight markings, handles, springs.",
          buyerCheck: "Condition, mechanical wear, grip quality, true specs.",
        },
        {
          title: "Branding / Size / Label Check",
          description:
            "Photograph brand logos, sizing tags, or engraved capacity (kg/lbs) or model numbers.",
          buyerCheck: "Authenticity, weight/class confirmation, originality.",
        },
        {
          title: "Condition/Texture Check",
          description:
            "Zoom in on high-touch areas — mats, padding, laces, belts.",
          buyerCheck: "Usage signs, material quality, rips, foam density.",
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
                Visibuy Verification Guide
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
        <div className="container mx-auto px-4 pt-20">
          <div className="max-w-4xl mx-auto">
            {/* Categories Section */}
            <div className="space-y-4">
              {categories.map((category) => (
                <Card key={category.id} className="overflow-hidden">
                  <CardHeader
                    className="cursor-pointer hover:bg-visibuy-light-shade transition-colors"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <category.icon className="w-6 h-6 text-visibuy-primary" />
                        <div>
                          <CardTitle className="text-lg">
                            {category.title}
                          </CardTitle>
                          <CardDescription className="leading-tight mt-2">
                            {category.subtitle}
                          </CardDescription>
                        </div>
                      </div>
                      {expandedCategories.includes(category.id) ? (
                        <ChevronDown className="w-5 h-5 text-visibuy-primary" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-visibuy-primary" />
                      )}
                    </div>
                  </CardHeader>

                  {expandedCategories.includes(category.id) && (
                    <CardContent className="pt-0">
                      <div className="grid gap-4">
                        {category.steps.map((step, index) => (
                          <div
                            key={index}
                            className="border-l-4 border-visibuy-primary pl-4 py-2"
                          >
                            <div className="flex items-start gap-3">
                              <div className="bg-visibuy-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-visibuy-dark-gray mb-1">
                                  {step.title}
                                </h4>
                                <p className="text-sm text-visibuy-dark-gray mb-2">
                                  {step.description}
                                </p>
                                <div className="bg-visibuy-green/10 border border-visibuy-green/20 rounded-lg p-2">
                                  <p className="text-xs text-visibuy-green font-medium">
                                    Buyer checks: {step.buyerCheck}
                                  </p>
                                </div>
                              </div>
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
            <p className="max-w-4xl mx-auto mt-12" >
              🔧 Note: We’re continuously improving our verification process. As
              Visibuy evolves, verification will become faster, smarter, and
              even more reliable — so you can shop with growing confidence.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VerificationGuide;
