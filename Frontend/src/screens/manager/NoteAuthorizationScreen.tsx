import React, { useMemo, useState } from 'react';
import { toast } from 'sonner';
import SearchBar from '../../components/common/searchBar';
import { useNotes } from '../../context/NoteContext';
import NoteAuthorizationCard from '../../features/notes/NoteAuthorizationCard';
import RejectNoteModal from '../../features/notes/RejectNoteModal';
import { noteTabs, type NoteTab } from '../../features/notes/noteAuthorizationUtils';
import { type statusNote, type WarehouseNote } from '../../types/note';

const NoteAuthorizationScreen: React.FC = () => {
  const { allNotes, updateStatus } = useNotes();
  const [activeTab, setActiveTab] = useState<NoteTab>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [rejectingNote, setRejectingNote] = useState<WarehouseNote | null>(null);

  const notesToDisplay = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return allNotes.filter((note) => {
      const matchesTab = activeTab === 'all' || note.status === activeTab;
      const matchesSearch =
        query.length === 0 ||
        note.noteNumber.toLowerCase().includes(query) ||
        note.operator.toLowerCase().includes(query);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, allNotes, searchTerm]);

  const handleAction = async (id: string, status: statusNote, reason?: string) => {
    const trimmedReason = reason?.trim();

    if (status === 'rejected' && !trimmedReason) {
      toast.error('Please provide a reason for rejection.');
      return false;
    }

    return updateStatus(id, status, trimmedReason);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Note Authorization</h1>
        <p className="text-gray-600 mt-1">Review and authorize warehouse documents</p>
      </div>

      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 p-1 lg:flex-1">
            {noteTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`min-w-0 flex-1 px-2 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap xl:px-4 xl:text-base ${
                  activeTab === tab.value
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="w-full min-w-0 [&>div]:mb-0 lg:w-80 lg:shrink-0 xl:w-96">
            <SearchBar
              label="Find notes by note number or operator"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {notesToDisplay.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400">No notes found matching your criteria.</p>
          </div>
        )}

        {notesToDisplay.map((note) => (
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
