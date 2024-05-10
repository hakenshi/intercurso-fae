import React from 'react'

export const Paginate = ({currentPage, handlePageChange, lastPage}) => {
  return (
    <div className="flex justify-center p-2 gap-3">
        <div>
            {currentPage && (
                <button onClick={()=>handlePageChange(currentPage - 1)} disabled={currentPage > 1 ? false : true}  className='border rounded-md w-10 h-10'>&laquo;</button>
            )}
        </div>
        <div className='border rounded-md divide-x'>
            {Array.from({length: lastPage}, (_,i) => i + 1).map(page => (
                <button key={page} onClick={()=>handlePageChange(page)} className={`w-10 h-10 ${page === currentPage ? "text-unifae-green-1" : ""}`}>{page}</button>
            ))}
        </div>
        <div>
            {currentPage && (
                <button onClick={()=>handlePageChange(currentPage + 1)} disabled={currentPage < lastPage ? false : true} className='border rounded-md w-8 h-10'>&raquo;</button>
            )}
        </div>
    </div>
)
}
