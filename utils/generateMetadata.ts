import { Metadata } from "next";

type GenerateMetadataProps = {
  title?: string,
  description?: string,
  image?: string,
  icons?: string,
  noIndex?: boolean
}

export function generateMetadata({ 
  title = "Buildd - Promoting building in public", 
  description = "Create Your Projects In The Open And Be Discovered By A Community Eager To Connect, Collaborate, And Celebrate Innovation. Share Your Learning Each For Better Visibility.", 
  image = "/thumbnail.png", 
  icons = "/favicon.ico", 
  noIndex = false
}: GenerateMetadataProps = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@manishdevrani777",
    },
    icons,
    metadataBase: new URL("https://buildd-eight.vercel.app"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}