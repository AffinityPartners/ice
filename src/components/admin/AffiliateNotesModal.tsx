'use client';

import { useState, useEffect } from 'react';
import {
  FaStickyNote,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
  FaFlag,
  FaCircle,
  FaSpinner
} from 'react-icons/fa';
import Modal from '@/components/ui/Modal';

interface Note {
  id: string;
  title: string;
  content: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  category: string;
  createdAt: string;
  author?: {
    id: string;
    name: string | null;
    email: string | null;
  };
}

interface AffiliateNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  affiliateId: string;
  affiliateName: string;
}

const priorityConfig = {
  LOW: { color: 'text-gray-600', bg: 'bg-gray-100', icon: FaCircle },
  MEDIUM: { color: 'text-blue-600', bg: 'bg-blue-100', icon: FaCircle },
  HIGH: { color: 'text-orange-600', bg: 'bg-orange-100', icon: FaFlag },
  CRITICAL: { color: 'text-red-600', bg: 'bg-red-100', icon: FaExclamationTriangle },
};

const categoryOptions = [
  'GENERAL',
  'COMPLIANCE',
  'PAYMENT',
  'PERFORMANCE',
  'SUPPORT',
  'OTHER',
];

export default function AffiliateNotesModal({
  isOpen,
  onClose,
  affiliateId,
  affiliateName,
}: AffiliateNotesModalProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddNote, setShowAddNote] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [saving, setSaving] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    priority: 'MEDIUM' as const,
    category: 'GENERAL',
  });

  useEffect(() => {
    if (isOpen) {
      fetchNotes();
    }
  }, [isOpen, affiliateId]);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`/api/admin/affiliates/${affiliateId}/notes`);
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.title || !newNote.content) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/affiliates/${affiliateId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        await fetchNotes();
        setShowAddNote(false);
        setNewNote({
          title: '',
          content: '',
          priority: 'MEDIUM',
          category: 'GENERAL',
        });
      }
    } catch (error) {
      console.error('Failed to add note:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateNote = async (note: Note) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/affiliates/${affiliateId}/notes/${note.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: note.title,
          content: note.content,
          priority: note.priority,
          category: note.category,
        }),
      });

      if (response.ok) {
        await fetchNotes();
        setEditingNote(null);
      }
    } catch (error) {
      console.error('Failed to update note:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return;

    try {
      const response = await fetch(`/api/admin/affiliates/${affiliateId}/notes/${noteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchNotes();
      }
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const PriorityIcon = ({ priority }: { priority: keyof typeof priorityConfig }) => {
    const Icon = priorityConfig[priority].icon;
    return <Icon className={`${priorityConfig[priority].color} w-4 h-4`} />;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Notes for ${affiliateName}`}
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Add Note Button */}
        {!showAddNote && !editingNote && (
          <button
            onClick={() => setShowAddNote(true)}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#245789] hover:text-[#245789] transition-colors"
          >
            <FaPlus className="inline mr-2" />
            Add New Note
          </button>
        )}

        {/* Add/Edit Note Form */}
        {(showAddNote || editingNote) && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <input
              type="text"
              placeholder="Note title..."
              value={editingNote ? editingNote.title : newNote.title}
              onChange={(e) =>
                editingNote
                  ? setEditingNote({ ...editingNote, title: e.target.value })
                  : setNewNote({ ...newNote, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
            />
            
            <textarea
              placeholder="Note content..."
              value={editingNote ? editingNote.content : newNote.content}
              onChange={(e) =>
                editingNote
                  ? setEditingNote({ ...editingNote, content: e.target.value })
                  : setNewNote({ ...newNote, content: e.target.value })
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
            />
            
            <div className="flex gap-3">
              <select
                value={editingNote ? editingNote.priority : newNote.priority}
                onChange={(e) =>
                  editingNote
                    ? setEditingNote({ ...editingNote, priority: e.target.value as any })
                    : setNewNote({ ...newNote, priority: e.target.value as any })
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
              >
                <option value="LOW">Low Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="HIGH">High Priority</option>
                <option value="CRITICAL">Critical</option>
              </select>
              
              <select
                value={editingNote ? editingNote.category : newNote.category}
                onChange={(e) =>
                  editingNote
                    ? setEditingNote({ ...editingNote, category: e.target.value })
                    : setNewNote({ ...newNote, category: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
              >
                {categoryOptions.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowAddNote(false);
                  setEditingNote(null);
                  setNewNote({
                    title: '',
                    content: '',
                    priority: 'MEDIUM',
                    category: 'GENERAL',
                  });
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => editingNote ? handleUpdateNote(editingNote) : handleAddNote()}
                disabled={saving}
                className="px-4 py-2 bg-[#245789] text-white rounded-lg hover:bg-[#1a3e5f] transition-colors disabled:opacity-50"
              >
                {saving ? <FaSpinner className="inline animate-spin mr-2" /> : null}
                {editingNote ? 'Update' : 'Add'} Note
              </button>
            </div>
          </div>
        )}

        {/* Notes List */}
        {loading ? (
          <div className="text-center py-8">
            <FaSpinner className="animate-spin text-2xl text-[#245789] mx-auto" />
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FaStickyNote className="text-4xl mx-auto mb-3 opacity-50" />
            <p>No notes yet</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notes.map((note) => (
              <div
                key={note.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <PriorityIcon priority={note.priority} />
                      <h4 className="font-medium text-gray-900">{note.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${priorityConfig[note.priority].bg} ${priorityConfig[note.priority].color}`}>
                        {note.priority}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        {note.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{note.content}</p>
                    <div className="text-xs text-gray-500">
                      {note.author && (
                        <span>By {note.author.name || note.author.email} • </span>
                      )}
                      {new Date(note.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => setEditingNote(note)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <FaEdit className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                    >
                      <FaTrash className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}