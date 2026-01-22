import { RemoteWrapper, ErrorMessage } from '../components';
import { createRemoteComponent } from '../utils/createRemoteComponent';
import './TodoList.css';

// Create the lazy-loaded component outside of render
const EDespensaRemote = createRemoteComponent(
    () => import('eDespensa/App')
);

const EDespensa = () => {
    return (
        <div className="todo-list-page">
            <RemoteWrapper 
                remoteComponent={EDespensaRemote} 
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

export default EDespensa;