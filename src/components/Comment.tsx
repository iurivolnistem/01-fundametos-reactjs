import { HandsClapping, Trash } from 'phosphor-react';
import { useState } from 'react';

import { Avatar } from './Avatar';

import styles from './Comment.module.css';

interface CommentProps{
    content: string;
    onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment } : CommentProps){
    const [likeCount, setLikeCount] = useState(0);
    
    
    function handleDeleteComment(){
        onDeleteComment(content);
    }

    function handleCommentLike(){
        setLikeCount((state) => {
            return state + 1;
        });
    }

    return(
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/iurivolnistem.png" />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Iuri Volnistem</strong>
                            <time title="18 de Janeiro às 16:47" dateTime="2023-01-18 16:47:01">Cerca de 1h atrás</time>
                        </div>
                        <button onClick={handleDeleteComment} title="Excluir comentário">
                            <Trash size={24}/>
                        </button>
                    </header>
                    <p>{ content }</p>
                </div>
                <footer>
                    <button onClick={handleCommentLike}>
                        <HandsClapping /> Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    );
}