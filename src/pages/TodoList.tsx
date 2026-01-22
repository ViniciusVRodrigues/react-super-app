import RemoteWrapper from '../components/RemoteWrapper';
import { createRemoteComponent } from '../utils/createRemoteComponent';
import './TodoList.css';

// Create the lazy-loaded component outside of render
const TodoListRemote = createRemoteComponent(
    () => import('todoApp/App')
);

const TodoList = () => {
    return (
        <div className="todo-list-page">
            <h1>Todo List from Remote App</h1>
            <RemoteWrapper remoteComponent={TodoListRemote} errorFallback={
                <div className="error-container">
                    <h3>⚠️ Módulo não disponível</h3>
                    <p>Este é um exemplo de como o Super App lida com erros de módulos remotos.</p>
                    <p>O aplicativo continua funcionando normalmente!</p>
                </div>
            } />
        </div>
    );
}

export default TodoList;