function Header() {
  return (
    <header className="bg-d4-darker border-b border-d4-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <span className="text-lg font-semibold text-d4-text-secondary">数据库</span>
          </div>
          <span className="text-d4-border">/</span>
          <span className="text-lg font-semibold text-d4-gold">暗金</span>
          <span className="text-d4-text-secondary text-sm ml-2">Unique Items</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.open('../index.html', '_self')}
            className="px-4 py-2 bg-d4-input border border-d4-border hover:border-d4-gold/50 text-d4-text rounded-lg transition-all"
          >
            返回首页
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
