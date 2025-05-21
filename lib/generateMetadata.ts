import { Metadata } from "next";

type GenerateMetadataProps = {
  title?: string,
  description?: string,
  image?: string,
  icons?: string,
  noIndex?: boolean
}

export function generateMetadata({
  title = "buildinpubliq - promoting building in public",
  description = "create your projects in the open and be discovered by a community eager to connect, collaborate, and celebrate innovation. share your learning each for better visibility.",
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