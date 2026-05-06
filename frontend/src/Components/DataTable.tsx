import { ReactNode } from "react";

export type Column<T> = {
    header: string;
    render: (item: T, index: number) => ReactNode;
    className?: string;
}

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  isEditing?: (item: T) => boolean;
  renderEditRow?: (item: T, index: number) => ReactNode;
  renderCreateRow?: () => ReactNode;
  onAdd?: () => void;
};

// Essentially the component table for all CRUD tables, such as users and inventory
// Data is the data that the table uses, while columns specify what data should be shown in the table
// All other props are functions or booleans provided by all children components
export function DataTable<T>({data, columns, isEditing, renderEditRow, renderCreateRow, onAdd}: DataTableProps<T>) {
  return (
    <div className="w-full md:max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto shadow-sm">
            <table className="min-w-[900px] w-full leading-normal">
            <thead>
                <tr className="bg-stone-900 text-gray-300 text-xs uppercase tracking-widest">
                    {columns.map((c, i) => (
                        <th key={i} className="px-4 py-3 text-left">
                            {c.header}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody className="divide-y">
                {data.map((item, i) => {
                    const editing = isEditing?.(item);

                    if (editing && renderEditRow) {
                        return (
                            <tr key={i} className="bg-blue-50">
                                {renderEditRow(item, i)}
                            </tr>
                        );
                    }

                    return (
                        <tr key={i} className="hover:bg-gray-50">
                            {columns.map((c, colIndex) => (
                            <td key={colIndex} className={`px-4 py-3 ${c.className ?? ""}`}>
                                {c.render(item, i)}
                            </td>
                            ))}
                        </tr>
                    );
                })}

                {renderCreateRow && (
                    <tr className="border-t-2 bg-blue-50/40">
                    {renderCreateRow()}
                    </tr>
                )}
            </tbody>
                {onAdd && (
                    <tfoot className="bg-stone-900">
                        <tr>
                        <td colSpan={columns.length} className="px-4 py-3">
                            <div className="flex justify-end">
                            <button onClick={onAdd} className="w-8 h-8 rounded-lg bg-green-900 text-white flex items-center justify-center text-lg shadow">
                                +
                            </button>
                            </div>
                        </td>
                        </tr>
                    </tfoot>
                )}
            </table>
        </div>
    </div>
  );
}