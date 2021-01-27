// Try not to mix the name of the variable, you've got a timer here as an elementID then you named your JSON container timer again?
let showTime = document.getElementById("timer");

let {
	min = 0,
	sec = 0,
	millisecond = 0,
	lap = 0,
	lastSave = "00:00:00",
	record = [],
	timeDifArray = [],
} = JSON.stringify(timer);

var stopThis;
var timeCount = false;

//buttons
document.getElementById("start-btn").addEventListener("click", startFunction);
document.getElementById("lap-btn").addEventListener("click", () => {
	saveRecord();
});
document.getElementById("reset-btn").addEventListener("click", resetFunction);
document.getElementById("pause-btn").addEventListener("click", startFunction);

//Printing out the time from start function
function printTimer() {
	var currTime = `${min}:${sec}:${millisecond}`;

	millisecond < 99
		? (millisecond += 1)
		: sec < 60
		? ((millisecond = 0), (sec += 1))
		: ((millisecond = 0), (sec = 0), (min += 1));

	// showTime.innerHTML = `${min}:${sec}:${millisecond}`;
	showTime.innerHTML = getTimeFormat(min, sec, millisecond);

	//for the table
	if (record.length > 0) {
		var table_splitTime = document.getElementById("timeRecord_body")
			.firstChild;

		//for the table lapTime time running
		var table_splitTimeChange = table_splitTime.firstChild.nextSibling;
		// table_splitTimeChange.innerHTML = timeDifferent(lastSave, currTime);

		//for the table split time running
		var table_splitTimeChange = table_splitTime.lastChild;
		table_splitTimeChange.innerHTML = getTimeFormat(min, sec, millisecond);
	}
}

//reset the timer and stop the timer
function resetFunction() {
	// why so much line coding if there's no other code involved? just reload the shit instead
	window.location.reload(true);
}

//find out the time different
function timeDifferent(start, end) {
	console.log("%c start", "color:red", start);
	console.log("%c end", "color:green", end);
	let endTime = end.split(":").map((x) => {
		return parseInt(x);
	});

	let startTime = start.split(":").map((x) => {
		return parseInt(x);
	});

	for (let i = 2; i >= 0; i--) {
		startTime[i] > endTime[i] && (endTime[i - 1] - 1, endTime[i] + 60);
		console.log(endTime[i - 1] - 1);
		// console.log(startTime[i], "start");

		timeDifArray.push = endTime[i] - startTime[i];
	}

	return getTimeFormat(timeDifArray[0], timeDifArray[1], timeDifArray[2]);
}

//save records
function saveRecord() {
	document.getElementById("timeRecord").style.display = "table";
	var currentTime = getTimeFormat(min, sec, millisecond);

	if (record.length === 0) {
		lap += 1;

		//the first line of the record

		var newRecord = document.createElement("tr");

		document
			.getElementById("timeRecord_body")
			.insertBefore(
				newRecord,
				document.getElementById("timeRecord_body").childNodes[0],
			);

		var newLap = document.createElement("td");
		newLap.innerHTML = ("0" + lap).slice(-2);

		var newLapTime = document.createElement("td");
		newLapTime.innerHTML = timeDifferent(lastSave, currentTime);

		var newSplitTime = document.createElement("td");
		newSplitTime.innerHTML = getTimeFormat(min, sec, millisecond);

		newRecord.appendChild(newLap);
		newRecord.appendChild(newLapTime);
		newRecord.appendChild(newSplitTime);

		record.push(lastSave);
	}

	lastSave = getTimeFormat(min, sec, millisecond);

	//the second line
	if (record.length > 0) {
		lap += 1;

		var newRecord = document.createElement("tr");

		//change the order of the table
		document
			.getElementById("timeRecord_body")
			.insertBefore(
				newRecord,
				document.getElementById("timeRecord_body").childNodes[0],
			);

		var newLap = document.createElement("td");
		newLap.innerHTML = ("0" + lap).slice(-2);

		var newLapTime = document.createElement("td");
		newLapTime.innerHTML = timeDifferent(lastSave, currentTime);

		var newSplitTime = document.createElement("td");

		newRecord.appendChild(newLap);
		newRecord.appendChild(newLapTime);
		newRecord.appendChild(newSplitTime);
	}
}

//Start counting
function startFunction() {
	const startBtnText = document.querySelector(".buttons");
	timeCount = !timeCount;

	timeCount
		? ((stopThis = setInterval(printTimer, 10)),
		  startBtnText.classList.add("active"))
		: (clearInterval(stopThis), startBtnText.classList.remove("active"));
}

function getTimeFormat(min, sec, millisecond) {
	var timeFormatter = [min, sec, millisecond];

	var formattedTime = timeFormatter.map((e) => {
		if (e < 10) {
			return e.toString().padStart(2, "0");
		} else {
			return parseInt(e);
		}
	});

	min = formattedTime[0];
	sec = formattedTime[1];
	millisecond = formattedTime[2];

	return `${min}:${sec}:${millisecond}`;
}
