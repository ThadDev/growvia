export default function StatCardSkeleton() {
  return (
    <div className="bg-card rounded-xl shadow p-5 animate-pulse">
      <div className="h-4 w-1/3 bg-border-color rounded mb-4"></div>

      <div className="h-8 w-2/3 bg-border-color rounded mb-6"></div>

      <div className="h-20 w-full bg-border-color rounded"></div>
    </div>
  );
}
