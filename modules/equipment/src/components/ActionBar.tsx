function ActionBar() {
  const actionIcons = [
    { id: 'skill1', icon: 'M13 3L4 14h7l-2 7 9-11h-7l2-7z' },
    { id: 'skill2', icon: 'M12 2L4 5v6l8 4 8-4V5l-8-3z' },
    { id: 'skill3', icon: 'M12 2C8 2 4 6 4 12s4 10 8 10 8-4 8-10S16 2 12 2z' },
    { id: 'skill4', icon: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z' },
    { id: 'skill5', icon: 'M12 2l2 8h8l-6 5 2 8-6-5-6 5 2-8-6-5h8z' },
    { id: 'skill6', icon: 'M20 6h-4V4c0-1-1-2-2-2h-4c-1 0-2 1-2 2v2H4c-1 0-2 1-2 2v12c0 1 1 2 2 2h16c1 0 2-1 2-2V8c0-1-1-2-2-2zm-6 0h-4V4h4v2z' }
  ]
  
  return (
    <div className="action-bar bg-d4-panel-bottom border-t border-d4-border px-4 py-1.5 flex justify-center gap-2">
      {actionIcons.map((action) => (
        <div key={action.id} className="action-slot w-10 h-10 rounded border border-d4-border bg-d4-dark flex items-center justify-center cursor-pointer transition-all hover:border-d4-gold hover:-translate-y-0.5">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-d4-gold opacity-70">
            <path d={action.icon} fill="currentColor" />
          </svg>
        </div>
      ))}
    </div>
  )
}

export default ActionBar
