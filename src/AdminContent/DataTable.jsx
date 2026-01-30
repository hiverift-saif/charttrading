import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";

const DataTable = ({
  data = [],
  columns = [],
  loading = false,
  pageSize = 10,
  searchPlaceholder = "Search...",
}) => {
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    globalFilterFn: (row, _columnId, filterValue) => {
      const val = (filterValue || "").toLowerCase();
      const email = row.original?.userId?.email || "";
      const id = row.original?._id || "";
      return (
        String(email).toLowerCase().includes(val) ||
        String(id).toLowerCase().includes(val)
      );
    },

    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  return (
    <div className="space-y-4">
      {/* SEARCH */}
      <div>
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full px-4 py-3 rounded-xl text-xs font-bold outline-none border transition-all
            bg-gray-50 border-gray-200 text-black focus:border-[#f99616]
            dark:bg-black dark:border-zinc-800 dark:text-white"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-zinc-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400"
                    >
                      {header.isPlaceholder ? null : (
                        <button
                          className="inline-flex items-center gap-2"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <ArrowUpDown size={14} className="opacity-50" />
                          )}
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-zinc-900">
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-10 text-center text-xs font-bold text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-10 text-center text-xs font-bold text-gray-500"
                  >
                    No records found
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-[#f99616]/5 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-5 text-xs text-black dark:text-white"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-2 border rounded-xl disabled:opacity-30
              border-gray-200 dark:border-zinc-800 dark:text-white"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-2 border rounded-xl disabled:opacity-30
              border-gray-200 dark:border-zinc-800 dark:text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
