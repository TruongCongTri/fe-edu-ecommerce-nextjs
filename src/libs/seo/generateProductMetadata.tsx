import { Metadata } from "next";
import { jobService } from "@/libs/jobService";
import { getCitySlugs } from "@/helpers/getCitySlugs";

export async function generateProductPageMetadata(slugParts: string[]): Promise<Metadata> {
  if (slugParts.length === 1) {
    const job = await jobService.getJobBySlug(slugParts[0]);
    if (job) {
      return {
        title: `${job.title} at ${job.company} | Antoree`,
        description: `Explore course for ${job.title} at ${job.company}, located in ${job.location.map((l) => l.label).join(", ")}.`,
      };
    }
  }

  const [searchSlug, citySlug] = slugParts;
  const citySlugs = getCitySlugs();

  const searchQuery = decodeURIComponent(searchSlug || "").replace(/-/g, " ");
  const cityName = citySlugs.includes(citySlug || "") ? citySlug.replace(/-/g, " ") : null;

  let title = "IT Jobs in Vietnam | Job Hive";
  let description = "Explore job opportunities in Vietnam across various industries and locations.";

  if (searchQuery && cityName) {
    title = `${searchQuery} jobs in ${cityName} | Job Hive`;
    description = `Browse available ${searchQuery} jobs in ${cityName}.`;
  } else if (searchQuery) {
    title = `${searchQuery} jobs | Job Hive`;
    description = `Find ${searchQuery} job opportunities across Vietnam.`;
  } else if (cityName) {
    title = `Jobs in ${cityName} | Job Hive`;
    description = `Explore job openings in ${cityName}, Vietnam.`;
  }

  return {
    title,
    description,
  };
}
