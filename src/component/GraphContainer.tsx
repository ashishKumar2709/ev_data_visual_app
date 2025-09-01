import React from 'react'
import GraphLoader from './GraphLoader';

const GraphContainer = ({children, loading, description}: {children: React.ReactNode; loading: boolean; description: string; }) => {
  return (
    <>
      {loading ? (
        <GraphLoader />
      ) : (
        <div className="border border-gray-600 rounded text-indigo-900 p-6 w-[635px] h-[340px]">
            {children }
           <p className="text-blue-400 text-center text-sm">
            {description}
          </p>
        </div>
      )}
    </>
  )
}

export default GraphContainer