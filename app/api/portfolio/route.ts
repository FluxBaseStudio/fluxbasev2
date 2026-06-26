import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET() {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ projects: [], source: "empty" });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const products = await stripe.products.list({
      active: true,
      limit: 40,
    });

    const projects = products.data
      .filter((product) => {
        const type = product.metadata?.type?.toLowerCase();
        return type === "portfolio" || Boolean(product.metadata?.demo_url);
      })
      .map((product) => ({
        id: product.id,
        title: product.name,
        description:
          product.description ||
          "Projekt strony internetowej przygotowany przez FluxBase.",
        image: product.images?.[0] || null,
        category: product.metadata?.category || "Website",
        demoUrl: product.metadata?.demo_url || "#",
        featured: product.metadata?.featured !== "false",
      }));

    return NextResponse.json({
      projects,
      source: projects.length > 0 ? "stripe" : "empty",
    });
  } catch (error) {
    console.error("Portfolio API error:", error);
    return NextResponse.json({ projects: [], source: "empty" });
  }
}
