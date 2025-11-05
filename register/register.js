function participantTemplate(count)
{
    return `<section class="participant${count}">
        <p>Participant ${count}</p>
        <div class="item">
          <label for="fname${count}"> First Name<span>*</span></label>
            <input id="fname${count}" type="text" name="fname${count}" value="" required />
        </div>
        <div class="item activities">
            <label for="activity${count}">Activity #<span>*</span></label>
            <input id="activity${count}" type="text" name="activity${count}" />
        </div>
        <div class="item">
            <label for="fee${count}">Fee ($)<span>*</span></label>
            <input id="fee${count}" type="number" name="fee${count}" />
        </div>
        <div class="item">
            <label for="date${count}">Desired Date <span>*</span></label>
            <input id="date${count}" type="date" name="date${count}" />
        </div>
        <div class="item">
            <p>Grade</p>    
            <select>
                <option selected value="" disabled selected></option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
                <option value="9">9th</option>
                <option value="10">10th</option>
                <option value="11">11th</option>
                <option value="12">12th</option>
            </select>
        </div>
    </section>`
    
    
}
document.querySelector('#add').addEventListener('click', function() {
    const participantsFieldset = document.querySelector('.participants');
    const participantCount = participantsFieldset.querySelectorAll('section').length + 1;
    const newParticipantHTML = participantTemplate(participantCount);
    const addButton = document.querySelector('#add');
    participantsFieldset.insertBefore(
        document.createRange().createContextualFragment(newParticipantHTML),
        addButton
    );
});
document.querySelector('#remove').addEventListener('click', function() {
    const participantsFieldset = document.querySelector('.participants');   
    const participantSections = participantsFieldset.querySelectorAll('section');
    if (participantSections.length > 1) {
        participantsFieldset.removeChild(participantSections[participantSections.length - 1]);
    }
});


document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
   const feeInputs = document.querySelectorAll('input[name^="fee"]');
let totalFee = 0;

feeInputs.forEach(function(input) {
  const feeValue = parseFloat(input.value.trim());
  if (!isNaN(feeValue)) {
    totalFee += feeValue;
  }
});

 adultName = document.querySelector('#adult_name').value;
    const participantCount = document.querySelectorAll('.participants section').length;
    document.querySelector('form').style.display = 'none';  
    const summary = document.querySelector('#summary');
    summary.textContent = `Thank you ${adultName} for registering. You have registered ${participantCount} participants and owe $${totalFee.toFixed(2)} in Fees.`;
    summary.style.display = 'block';
});