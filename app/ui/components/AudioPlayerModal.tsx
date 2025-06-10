import Image from 'next/image';
import Modal from 'react-modal';

interface Song {
  song_title: string;
  song_artist: string;
  song_img?: string;
  song_url: string;
}

interface AudioPlayerModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  selectedSong: Song | null;
}

const AudioPlayerModal = ({ modalIsOpen, closeModal, selectedSong }: AudioPlayerModalProps) => {
  return (
    <div>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Music Player"
        className="absolute md:w-[500px] flex flex-col justify-center items-center font-Dana gap-y-3 top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-mango-100 dark:bg-gray-700 p-5 rounded-lg shadow-lg"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeModal} className="w-full flex justify-end cursor-pointer">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 dark:text-gray-50">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
        {selectedSong && (
          <div className="flex justify-center items-center flex-col gap-y-3 dark:text-gray-50">
            <h2>{selectedSong.song_title}</h2>
            <p>{selectedSong.song_artist}</p>
            <Image
              width={48}
              height={48}
              src={selectedSong.song_img || "/images/songs/cover.png"}
              alt={selectedSong.song_title}
              className="rounded-full"
            />
            <audio autoPlay controls src={selectedSong.song_url}></audio>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AudioPlayerModal;
