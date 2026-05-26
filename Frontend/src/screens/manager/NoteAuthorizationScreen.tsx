import React, { useState } from 'react';
import { toast } from 'sonner';
import { useNotes } from '../../context/NoteContext';
import NoteAuthorizationCard from '../../features/notes/NoteAuthorizationCard';
import RejectNoteModal from '../../features/notes/RejectNoteModal';
import { noteTabs, type NoteTab } from '../../features/notes/noteAuthorizationUtils';
import { type WarehouseNote } from '../../types/note';
import { type statusNote } from '../../types/note';
import SearchBar from '../../components/common/searchBar';

const NoteAuthorizationScreen: React.FC = () => {
  const { allNotes, updateStatus } = useNotes();
  const [activeTab, setActiveTab] = useState<NoteTab>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [rejectingNote, setRejectingNote] = useState<WarehouseNote | null>(null);

  const handleAction = async (id: string, status: statusNote, reason?: string) => {
    const remark = reason?.trim();

    if (status === 'rejected' && !remark) {
      toast.error('Please provide a reason for rejection.');
      return false;
    }

    return updateStatus(id, status, remark);
  };

  const noteToDisplay = allNotes.filter((note) => {
    const normalizedSearch = searchTerm.toLowerCase();
    const matchesTab = activeTab === 'all' || note.status === activeTab;
    const matchesSearch =
      note.noteNumber.toLowerCase().includes(normalizedSearch) ||
      note.operator.toLowerCase().includes(normalizedSearch);

    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Note Authorization</h1>
        <p className="text-gray-600 mt-1">Review and authorize warehouse documents</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6 items-start">
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          {noteTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.value
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="min-w-0">
          <SearchBar
            label="Find notes by note number or operator"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-6">
        {noteToDisplay.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400">No notes found matching your criteria.</p>
          </div>
        )}

        {noteToDisplay.map((note) => (
          <NoteAuthorizationCard
            key={note.id}
            note={note}
            onApprove={() => void handleAction(note.id, 'approved')}
            onReject={() => setRejectingNote(note)}
          />
        ))}
      </div>

      <RejectNoteModal
        isOpen={rejectingNote !== null}
        noteNumber={rejectingNote?.noteNumber}
        onClose={() => setRejectingNote(null)}
        onConfirm={async (reason) => {
          if (!rejectingNote) return false;
          const ok = await handleAction(rejectingNote.id, 'rejected', reason);
          if (ok) {
            setRejectingNote(null);
          }
          return ok;
        }}
      />
    </div>
  );
};

export default NoteAuthorizationScreen;
