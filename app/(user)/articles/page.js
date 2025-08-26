import PageHero from '@/components/PageHero';
import ArticleCard from '@/components/ArticleCard';
import articles from '@/data/articles.json';

export default function ArticlesPage() {
  return (
    <>
      <PageHero title="Articles" />
      <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map(article => (
            <ArticleCard 
              key={article.slug} 
              article={article} 
              className="text-sm sm:text-base md:text-base lg:text-base"
            />
          ))}
        </div>
      </div>
    </>
  );
}
