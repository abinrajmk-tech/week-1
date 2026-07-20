import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { init as accordianInit } from "./accordion.js";
import { init as navInit } from "./nav.js";
/*.toBeVisible();
task 5 : DOm Testing with JSDOM
1. configure jest with testEnvironment : 'jsdom' in jest.config.js
2. Test FormValidator: render a form , call validate(), assert error messages appear and disappear
3. Test accordion: click a header , assert aria-expanded changes to 'true' and panel becomes visible 
4. Test mobile nav: simulate hamburger click, assert drawer has class = open and focus is trapped

*/
beforeEach(() => {
    document.body.innerHTML = "";
});

describe("test accordian", () => {
    test("accordin open", () => {
        document.body.innerHTML = `<style>
            .content {
                transition: max-height 300ms linear;
                height: 0px;
                overflow: hidden;
            }
            .content-height {
                height: 300px;
            }
            
        </style>
        <div class="top-container">
            <button
                
                aria-expanded="false"
                id="content-btn"
            >
                Click here to view the content
            </button>
            <div class="content">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatibus, possimus! Voluptatibus, possimus! Voluptatibus,
                possimus! Voluptatibus, possimus! Voluptatibus, possimus!
            </di
        </div>`;
        const contentBtn = document.querySelector("#content-btn");
        const content = document.querySelector(".content");
        accordianInit();
        contentBtn.click();
        expect(content.classList.value).toContain("content-height");
        expect(contentBtn.getAttribute("aria-expanded")).toBe("true");
    });
});

describe("test mobile navbar", () => {
    test("navbar open", () => {
        document.body.innerHTML = `
        <button class="hamburger">hamburger</button>
        <div class="sidebar-nav" aria-expanded="false">
                    <nav class="sidebar-navigation">
                        <ul class="side-nav-ul">
                            <li aria-current="page">
                                <p>
                                    <a class="current" href="./home.html"
                                        >Home</a
                                    >
                                </p>
                            </li>
                            <li>
                                <p><a href="./services.html">Services</a></p>
                            </li>
                            <li></li>
                            <li>
                                <p><a href="./about.html">About</a></p>
                            </li>
                            <li>
                                <p><a href="./team.html">Team</a></p>
                         
                            <li>
                                <p><a href="./contact.html">Contact</a></p>
                            </li>
                        </ul>
                    </nav>
                </div>`;

        const hamburgerButton = document.querySelector(".hamburger");
        const navbar = document.querySelector(".sidebar-nav");
        navInit();
        hamburgerButton.click();
        expect(navbar.getAttribute("aria-expanded")).toBe("true");
        hamburgerButton.click();
        expect(navbar.getAttribute("aria-expanded")).toBe("false");
    });
});
