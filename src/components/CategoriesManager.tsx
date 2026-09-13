import { useState } from 'react';
import { useContent } from '../store';
import { IcPlus, IcTrash, IcCheck, IcX } from '../lib';
import type { Category } from '../data';

export function CategoriesManager() {
  const { categories, setCategories } = useContent();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const addCategory = async () => {
    if (!newCategoryName.trim()) return;
    
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: newCategoryName.trim(),
      active: true,
    };
    
    await setCategories([...categories, newCategory]);
    setNewCategoryName('');
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    await setCategories(categories.filter(c => c.id !== id));
  };

  const toggleCategory = async (id: string) => {
    const updated = categories.map(c => 
      c.id === id ? { ...c, active: !c.active } : c
    );
    await setCategories(updated);
  };

  const startEditing = (category: Category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  const saveEditing = async () => {
    if (!editingName.trim() || !editingId) return;
    
    const updated = categories.map(c => 
      c.id === editingId ? { ...c, name: editingName.trim() } : c
    );
    await setCategories(updated);
    setEditingId(null);
    setEditingName('');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName('');
  };

  return (
    <div className="space-y-6">
      {/* Add New Category */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-ink mb-4">Add New Category</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCategory()}
            placeholder="Enter category name"
            className="input-base flex-1"
          />
          <button
            onClick={addCategory}
            disabled={!newCategoryName.trim()}
            className="btn btn-pine !px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IcPlus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>

      {/* Categories List */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-ink mb-4">
          Manage Categories ({categories.length})
        </h3>
        
        {categories.length === 0 ? (
          <p className="text-slate text-center py-8">
            No categories yet. Add your first category above.
          </p>
        ) : (
          <div className="space-y-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                  category.active 
                    ? 'border-line bg-white' 
                    : 'border-line/50 bg-mist/50 opacity-60'
                }`}
              >
                {editingId === category.id ? (
                  // Editing mode
                  <>
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && saveEditing()}
                      className="input-base flex-1"
                      autoFocus
                    />
                    <button
                      onClick={saveEditing}
                      className="btn btn-pine !px-4 !py-2"
                    >
                      <IcCheck className="h-4 w-4" />
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="btn btn-outline !px-4 !py-2"
                    >
                      <IcX className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  // View mode
                  <>
                    <div className="flex-1">
                      <p className={`font-semibold ${category.active ? 'text-ink' : 'text-slate'}`}>
                        {category.name}
                      </p>
                      <p className="text-xs text-slate mt-1">
                        {category.active ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                    
                    {/* Toggle Active/Inactive */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        category.active
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      {category.active ? 'Active' : 'Inactive'}
                    </button>
                    
                    {/* Edit Button */}
                    <button
                      onClick={() => startEditing(category)}
                      className="btn btn-outline !px-4 !py-2"
                    >
                      Edit
                    </button>
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => deleteCategory(category.id)}
                      className="btn btn-outline !px-4 !py-2 text-red-600 hover:bg-red-50"
                    >
                      <IcTrash className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="card p-6 bg-blue-50 border-blue-200">
        <h4 className="font-bold text-ink mb-2">💡 How Categories Work</h4>
        <ul className="text-sm text-slate space-y-2">
          <li>• <strong>Active categories</strong> appear in the gallery filter buttons</li>
          <li>• <strong>Inactive categories</strong> are hidden from the public gallery</li>
          <li>• Projects can still be assigned to inactive categories</li>
          <li>• Toggle categories on/off to control what visitors see</li>
          <li>• Delete categories you no longer need</li>
        </ul>
      </div>
    </div>
  );
}
