import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Comment } from './Comment';
import styles from './Post.module.css';
import { Avatar } from './Avatar';

interface Author{
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content{
    type: "paragraph" | "link";
    content: string;
}

interface PostProps{
    author: Author;
    publishedAt: Date;
    content: Content[];
}

export function Post({ author, publishedAt, content } : PostProps){
    const [comments, setComments] = useState([""]);
    const [newCommentText, setNewCommentText] = useState("");

    const formatedDate = format(publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    });

    const formatedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    function CreateNewComment(event: FormEvent){
        event.preventDefault();

        setComments([...comments, newCommentText]);
        setNewCommentText("");
    }

    function ChangeCommentText(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function deleteComment(commentToDelete: string){
        const commentsWithoutDeleted = comments.filter(comment => {
            return comment !== commentToDelete
        });

        setComments(commentsWithoutDeleted);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Este campo é obrigatório!');
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={ author.avatarUrl } />
                    <div className={styles.authorInfo}>
                        <strong>{ author.name }</strong>
                        <span>{ author.role }</span>
                    </div>
                </div>
                <time title={formatedDate} dateTime={publishedAt.toISOString()}>{formatedDateRelativeToNow}</time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if(line.type === 'paragraph'){
                        return <p key={line.content}>{line.content}</p>
                    }
                    else if(line.type === 'link'){
                        return <p key={line.content}><a href="">{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={CreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu comentário</strong>
                <textarea 
                    placeholder="Deixe um comentário" 
                    value={newCommentText}
                    onChange={ChangeCommentText}
                    onInvalid={handleNewCommentInvalid}
                    required
                />
                
                <footer>
                    <button 
                        type="submit"
                        disabled={isNewCommentEmpty}>
                            Publicar
                    </button>
                </footer>
            </form>
            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                    <Comment 
                        key={comment} 
                        content={comment}
                        onDeleteComment={deleteComment}
                    />
                )
                })}
            </div>
        </article>
    );
}