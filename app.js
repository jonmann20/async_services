// begin screener code
const returnValues = [
	'Hakuna',
	'Matata',
	'It means',
	'No worries',
	'For the rest of your days'
].sort(() => (Math.random() > 0.5 ? 1 : -1));

const createService = (retVal, index) => () =>
	new Promise(resolve =>
		setTimeout(() => {
			console.log(`${index}. ${retVal}`);
			resolve(retVal);
		}, Math.random() * 10000)
	);

const services = returnValues.map(createService);
// end screener code

const ulServices = document.getElementById('services');
const ulRankedServices = document.getElementById('services-ranked');

(async () => {
	const serviceCalls = services.map(async (service, i) => {
		let li = document.createElement('li');
		li.textContent = `Loading Service #${i}`;
		li.id = `service-${i}`;
		ulServices.appendChild(li);

		const val = await service();
		li.textContent = `Loaded Service #${i} -- ${val}`;
		ulRankedServices.appendChild(li);
	});

	await Promise.all(serviceCalls);
	document.querySelector('p').classList.remove('hidden');;
})();