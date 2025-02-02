export default function DashboardSkeleton() {
    return (
      <main className="p-4 flex-1 flex flex-col w-full h-[90vh]" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="mx-auto w-full rounded-md border p-4"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--card-bg)',
              }}
            >
              <div className="flex animate-pulse space-x-4">
                <div className="size-10 rounded-full" style={{ backgroundColor: 'var(--border)' }}></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 rounded" style={{ backgroundColor: 'var(--border)' }}></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-2 rounded" style={{ backgroundColor: 'var(--border)' }}></div>
                      <div className="col-span-1 h-2 rounded" style={{ backgroundColor: 'var(--border)' }}></div>
                    </div>
                    <div className="h-2 rounded" style={{ backgroundColor: 'var(--border)' }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 flex-1">
          <div className="overflow-auto p-4 rounded shadow" style={{  boxShadow: 'var(--box-shadow)' }}>
            <div className="hidden lg:block">
            <table className="w-full text-sm text-left rtl:text-right" style={{ borderCollapse: 'collapse' }}>
            <thead className="text-xs text-gray-700 uppercase" style={{ backgroundColor: 'var(--border)', color: 'var(--foreground)' }}>
              <tr>
                <th scope="col" className="px-6 py-3">
                  <div className="h-3 w-1/2 rounded bg-gray-200 animate-pulse"></div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="h-3 w-1/4 rounded bg-gray-200 animate-pulse"></div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="h-3 w-1/3 rounded bg-gray-200 animate-pulse"></div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="h-3 w-1/4 rounded bg-gray-200 animate-pulse"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 12 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="h-4 w-2/3 rounded bg-gray-200 animate-pulse"></div>
                  </th>
                  <td className="px-6 py-4">
                    <div className="h-3 w-1/2 rounded bg-gray-200 animate-pulse"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-3 w-3/4 rounded bg-gray-200 animate-pulse"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-3 w-1/4 rounded bg-gray-200 animate-pulse"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
  
            <div className="lg:hidden">
              <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className="mx-auto w-full max-w-sm rounded-md border p-4"
                    style={{
                      borderColor: 'var(--border)',
                      backgroundColor: 'var(--card-bg)',
                    }}
                  >
                    <div className="flex animate-pulse space-x-4">
                      <div className="size-10 rounded-full" style={{ backgroundColor: 'var(--border)' }}></div>
                      <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 rounded" style={{ backgroundColor: 'var(--border)' }}></div>
                        <div className="space-y-3">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2 h-2 rounded" style={{ backgroundColor: 'var(--border)' }}></div>
                            <div className="col-span-1 h-2 rounded" style={{ backgroundColor: 'var(--border)' }}></div>
                          </div>
                          <div className="h-2 rounded" style={{ backgroundColor: 'var(--border)' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          <div
            id="map"
            className="h-96 bg-background rounded shadow"
            style={{ backgroundColor: 'var(--background)' }}
          >
            <div className="h-[74.5vh] flex justify-center items-center text-center" style={{ backgroundColor: 'var(--border)' }}>
              <span className="text-sm text-primary-foreground">Loading map...</span>
            </div>
          </div>
        </div>
      </main>
    );
  }
  