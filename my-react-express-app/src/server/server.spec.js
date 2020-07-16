import { addNewTask, updateTask } from './server';


(async function myFun() {
    await addNewTask({
        name: "My second new Task",
        id: "1234"
    });

    await updateTask({
        name: "My second new Task Updated!",
        id: "1234"
    });
})();