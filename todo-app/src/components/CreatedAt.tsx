"use client"

type CreatedAtProps = {
    createdAt: Date; // Corrected the prop type
  };
  
  export function CreatedAt({ createdAt }: CreatedAtProps) {
    const formattedDate = createdAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  
    return (
    <div className="flex flex-col justify-start">
        <span>{formattedDate}</span>
    </div>
    )
  }