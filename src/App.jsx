import {atom, useAtom, useAtomValue} from 'jotai';
import {atomWithStorage} from 'jotai/utils';

const counter = atom(0);
// Sync with LocaleStorage/SessionStorage.
const darkTheme = atomWithStorage('darkTheme', false);
// Derived atom.
const friendsStatus = atom([
    {name: "John", online: true},
    {name: "David", online: false},
    {name: "Micheal", online: true}
]);
const onlineFriends = atom(get => get(friendsStatus).filter(f => f.online));

const name = atom('');
const headerTitle = atom(get => get(name).toUpperCase());

function App() {
    const [isDarkTheme, switchTheme] = useAtom(darkTheme);
    const [count, setCount] = useAtom(counter);

    // Read-only atom.
    const friends = useAtomValue(onlineFriends);

    const [personName, setPersonName] = useAtom(name);
    const title = useAtomValue(headerTitle);

    return (
        <>
            <button style={{backgroundColor: isDarkTheme ? '#aaa' : '#fff'}}
                    onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
            <button onClick={() => switchTheme(prev => !prev)}>
                Switch Theme
            </button>
            <ul>
                {friends.map(f => <li key={f.name}>{f.name}</li>)}
            </ul>

            <input type="text" placeholder="Enter your name" value={personName}
                   onChange={(e) => setPersonName(e.target.value)}/>
            <h3>{title}</h3>
        </>
    )
}

export default App
