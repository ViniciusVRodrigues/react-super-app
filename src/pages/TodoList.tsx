import { RemoteWrapper, ErrorMessage } from '../components';
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
            <RemoteWrapper 
                remoteComponent={TodoListRemote} 
                errorFallback={
                    <ErrorMessage 
                        title="⚠️ Módulo não disponível"
                        message="Este é um exemplo de como o Super App lida com erros de módulos remotos."
                        details="O aplicativo continua funcionando normalmente!"
                    />
                } 
            />
        </div>
    );
}

export default TodoList;