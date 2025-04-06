document.getElementById('add-btn').addEventListener('click', function() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    if (taskInput.value.trim() !== '') {
        const li = document.createElement('li');
        li.className = 'task-item';

        // Task content
        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';

        // Task text
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = taskInput.value;

        // Assemble content
        taskContent.append(checkbox, taskText);

        // Actions container
        const actions = document.createElement('div');
        actions.className = 'task-actions';

        // Edit button
        const editBtn = createEditButton();
        // Delete button
        const deleteBtn = createDeleteButton();

        actions.append(editBtn, deleteBtn);
        li.append(taskContent, actions);
        taskList.append(li);

        // Event listeners
        checkbox.addEventListener('change', function() {
            li.classList.toggle('task-completed', this.checked);
        });

        taskInput.value = '';
        taskInput.focus();
    }
});

function createEditButton() {
    const btn = document.createElement('button');
    btn.className = 'edit-btn';
    btn.innerHTML = '<i class="fas fa-edit"></i>';
    
    btn.addEventListener('click', function() {
        const li = this.closest('.task-item');
        const taskText = li.querySelector('.task-text');
        const actions = li.querySelector('.task-actions');

        const input = document.createElement('input');
        input.className = 'edit-input';
        input.value = taskText.textContent;

        // Replace text with input
        taskText.replaceWith(input);
        input.focus();

        // Create action buttons
        const updateBtn = document.createElement('button');
        updateBtn.className = 'update-btn';
        updateBtn.innerHTML = '<i class="fas fa-check"></i>';
        
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'cancel-btn';
        cancelBtn.innerHTML = '<i class="fas fa-times"></i>';

        // Clear and add new buttons
        actions.innerHTML = '';
        actions.append(updateBtn, cancelBtn);

        // Update handler
        const finishEdit = (success) => {
            actions.innerHTML = '';
            actions.append(createEditButton(), createDeleteButton());
            
            if (success && input.value.trim()) {
                taskText.textContent = input.value.trim();
            }
            input.replaceWith(taskText);
        };

        updateBtn.addEventListener('click', () => finishEdit(true));
        cancelBtn.addEventListener('click', () => finishEdit(false));
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') finishEdit(true);
        });
    });
    
    return btn;
}

function createDeleteButton() {
    const btn = document.createElement('button');
    btn.className = 'delete-btn';
    btn.innerHTML = '<i class="fas fa-trash"></i>';
    
    btn.addEventListener('click', function() {
        this.closest('.task-item').remove();
    });
    
    return btn;
}

document.getElementById('clear-btn').addEventListener('click', function() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear all tasks 
});