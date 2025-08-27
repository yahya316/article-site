// import PageHero from '@/components/PageHero';
// import ArticleCard from '@/components/ArticleCard';
// import articles from '@/data/articles.json';

// export default function ArticlesPage() {
//   return (
//     <>
//       <PageHero title="Articles" />
//       <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//           {articles.map(article => (
//             <ArticleCard 
//               key={article.slug} 
//               article={article} 
//               className="text-sm sm:text-base md:text-base lg:text-base"
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }




import PageHero from '@/components/PageHero';
import ArticleCard from '@/components/ArticleCard';

export default async function ArticlesPage() {
  let articles = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`, {
      cache: 'no-store', // Ensure fresh data
    });
    if (!res.ok) {
      throw new Error('Failed to fetch articles');
    }
    articles = await res.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
  }

  return (
    <>
      <PageHero title="Articles" />
      <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6">
        {articles.length === 0 ? (
          <p className="text-center text-gray-500">No articles found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                className="text-sm sm:text-base md:text-base lg:text-base"
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}