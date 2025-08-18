import { useParams } from 'react-router-dom';
import { ChatRoom } from './ChatRoom';

export default function ChatWrapper() {
    const { roomId } = useParams();
    const userId = localStorage.getItem('clientId') || localStorage.getItem('lawyerProfile');
    return <ChatRoom roomId={roomId} userId={userId} />;
}