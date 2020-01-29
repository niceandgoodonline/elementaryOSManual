document.getElementById('navButton').addEventListener("click", toggleSideNav);
let sideNav = document.getElementById("sideNav");
let navButton = document.getElementById('navButton');

let containerStyle = document.getElementById('container').style;
let glossary = {}

let sideNavState = false;
let quickGlossaryState = false;
let videoTabState = false;

function toggleSideNav(){

    if(window.innerHeight > window.innerWidth){
        set_portrait_css()
    }
    else{
        set_landscape_css()
    }
}

function expand_helper(){
    let helper = document.getElementById('helper')
    let expandButton = document.getElementById('expandButton')
    
    containerStyle.magrin = "0 0 45vh 0"
    helper.style.height = '66vh'
    expandButton.onclick = function() {contract_helper()}
}

function contract_helper(){
    let helper = document.getElementById('helper')
    let expandButton = document.getElementById('expandButton')

    containerStyle.magrin = "0 0 0 0"
    helper.style.height = '4vh'
    expandButton.onclick = function() {expand_helper()}
}

function set_portrait_css(){
    if (sideNavState == true){
        sideNavState = false;
        sideNav.style.width = '0';
        containerStyle.marginLeft = "8vh";
        navButton.style.left = '-10vh';
        navButton.style.fontSize = '14vh';
    }
    else{
        sideNavState = true;
        sideNav.style.width = '30vh';
        containerStyle.marginLeft = "30vh";
        sideNav.style.fontSize = '2vh'
        navButton.style.left = '5vh'
    }
}


function set_landscape_css(){
    if (sideNavState == true){
        sideNavState = false;
        sideNav.style.width = "0";
        navButton.style.fontSize = '14vh'
        navButton.style.left = '-10vh'
        containerStyle.marginLeft = "7vw";
    }
    else{
        sideNavState = true;
        sideNav.style.width = '33vw';
        sideNav.style.fontSize = "3vh"
        navButton.style.left = '13vw'
        containerStyle.marginLeft = "33vw";
    }
}

function onOrientationChange() {
    switch(window.orientation) {  
      case -90: case 90:
        sideNavState = true
        set_landscape_css()
        break; 
      default:
        sideNavState = true
        set_portrait_css()
        break; 
    }
}
  
window.addEventListener('orientationchange', onOrientationChange);


function makeGlossary(){
    glossary = {
        shell: "A command-line interpreter that provides you an interface to execute commands without a GUI.",
        terminal: glossary['shell'],
        CMD: glossary['shell'],
        bash: glossary['shell'],
        sudo: 'Prompts you for a password to execute administravtive (protected) tasks. Means "Substitue User DO" or "Super User DO".',
        distro: 'A specific version of Linux, which contains specific software. Similar to how Windows has home, professional, education versions.',
        X: 'The name of the GUI in Linux. Icons, windows, wallpaper etc. Also known as X11 and X-windows',
        root: 'The start of a Linux file system. Always located at "/".',
        rootUser: 'The System Administrator account. Has permission to do anything in the system.',
        compile: 'Turn source code into an application. Also refered to as "build".',
        binaries: 'Compiled code that "just runs" on Linux. All .exe files in windows are binaries.',
        apt: 'The shell command to get, install, update and upgrade software. Very power and simple tool.',
        kernel: 'The very core of a computer system. The bridge between hardware and Linux.',
        bootable: 'A disk or other medium from which the system can be booted. Contains the OS.',
        highlighted: 'This is where the definition would show up.'
    }
}

function show_highlighted_definitions(){
    makeGlossary()
    let terms = document.getElementsByTagName('mark')
    for (let i=0; i < terms.length; i++) {
        let term = terms[i].innerHTML
        terms[i].title = glossary[term.toLowerCase()]
        terms[i].setAttribute("onclick", "show_quick_glossary(); expand_helper();")
    }
}

function show_quick_glossary() {
    if (quickGlossaryState == false) {
        makeGlossary()
        let helper = document.getElementById('helper')
        let glossaryList = document.createElement('ol')
        glossaryList.id = "glossaryList"
        let terms = document.getElementsByTagName('mark')
        for (let i=0; i < terms.length; i++) {
            let glossaryItem = document.createElement('li')
            glossaryItem.innerHTML = "<mark>" + terms[i].innerHTML.toLowerCase() + "</mark>" + ' -> ' + terms[i].title 
            glossaryList.appendChild(glossaryItem)
            glossaryList.appendChild(document.createElement('br'))
        }
        helper.appendChild(glossaryList)
    }
    quickGlossaryState = true;
    videoTabState = false;
}

function show_video_tab() {
    if (quickGlossaryState == true) {
        let helper = document.getElementById('helper')
        let glossaryList = document.getElementById('glossaryList')
        helper.removeChild(glossaryList)
        quickGlossaryState = false;
    }
    if (videoTabState == false) {
        makeGlossary()
        let helper = document.getElementById('helper')
        let videoList = document.createElement('ol')
        for (let i=0; i < terms.length; i++) {
            let glossaryItem = document.createElement('li')
        }
        helper.appendChild(glossaryList)
        videoTabState = true;
    }
}

show_highlighted_definitions()
