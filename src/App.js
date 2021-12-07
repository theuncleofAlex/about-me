import React from 'react';
import logo from './logo.png';
import arrow from './arrow.png';
import './App.css';
import { useRef, useLayoutEffect } from 'react';

const isBrowser = typeof window !== `undefined`;

function getScrollPosition({ element, useWindow }) {
  if (!isBrowser) return { x: 0, y: 0 };

  const target = element ? element.current : document.body;
  const position = target.getBoundingClientRect();

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top }
}

export function useScrollPosition(effect, deps, element, useWindow, wait) {
  const position = useRef(getScrollPosition({ useWindow }));

  let throttleTimeout = null;

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow });
    effect({ prevPos: position.current, currPos });
    position.current = currPos;
    throttleTimeout = null
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait)
        }
      } else {
        callBack()
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll)
  }, deps)
}

class StaggeredComponents extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let index = 0;
        const className = "animated-expand " + (this.props.className ? this.props.className : "");
        return this.props.elements.map((item) => {
            const style = this.props.animated ? {
                transform: this.props.transformFunction,
                opacity: 1,
                transitionDelay: this.props.delayFunction(index) + "s",
                transitionDuration: this.props.durationFunction(index) + "s",
                transitionTimingFunction: "ease-out",
            } : {};
            index++;
            return(<div class={className} style={style}>{item}</div>);
        });
    }
}

Array.prototype.swap = function(indexA, indexB) {
   let temp = this[indexA];
   this[indexA] = this[indexB];
   this[indexB] = temp;
};

const images = [
    {
        id: "myself",
        description: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", " Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
    }, {
        id: "hangouts",
        link: "Hobbies",
        description: ["Github ipsum ddolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", " Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
        cardHeader: "See my projects",
        cards: [
            {
                header: "Hangouts",
                description: "A redesign of Google's Hangouts",
                href: "https://codepen.io/theuncleofalex/full/OKByZm"
            }, {
                header: "Due",
                description: "A time-saving plugin for Google Docs",
                //TODO: publsih due and put the link here
            }, {
                header: "Helix.io",
                description: "An online multi-player card game",
                href: "https://theuncleofalex.github.io/Helix-3/"
            }, {
                header: "Quantum Pool",
                description: "A quirky pool game with a programmed opponent",
                href: "https://github.com/theuncleofAlex/Pool-Table",
            }, {
                header: "This website",
                description: <>This website was coded <b>from scratch</b></>,
            },
        ]
    }, {
        id: "scio",
        link: "Clubs",
        description: ["Science ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", " Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
        cardHeader: "View my results",
        //TODO: Update these results or figure out how to present them better
        cards: [
            {
                header: "2017",
                description: "Second at State",
            }, {
                header: "2018",
                description: "First at Regionals",
            }, {
                header: "2019",
                description: "First at UT",
            },
        ]
    }, {
        id: "robotics",
        description: ["Robo-ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", " Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
    }, {
        id: "fun",
        description: ["Person ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", " Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
    }, {
        id: "me-again",
        link: "Contact",
        description: ["Contact ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", " Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
    }
];
const names = ["Alex Yang", "a Developer", "a Scientist", "an Engineer", "A Real Person", "Alex Yang"];
const text = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at nulla massa. Maecenas finibus vehicula aliquet.",
    "Look how good I am at coding",
    "Look how good I am at scio",
    "Look how good I am at robotics",
    "Look how good I am at having opinions",
    "And I can't wait to meet you!",
];
const contactBadges = [
    ["Email", "mailto:aspam@yang2k.com", <svg xmlns="http://www.w3.org/2000/svg" viewBox="8 8 16 16" class="rounded-icon__svg centered-icon__svg social-icon__svg social-icon--email__svg inline-share-email__svg inline-icon__svg"><path d="M23.363 20.875H8.637v-8.938l6.545 5.687h1.637l6.544-5.687v8.938zm-1.635-9.75L16 16l-5.728-4.875h11.456zM23.363 9.5H8.637L7 11.125v9.75L8.637 22.5h14.727L25 20.875v-9.75L23.363 9.5z"></path></svg>],
    ["Codepen", "https://codepen.io/theuncleofalex", <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M100 34.2c-.4-2.6-3.3-4-5.3-5.3-3.6-2.4-7.1-4.7-10.7-7.1-8.5-5.7-17.1-11.4-25.6-17.1-2-1.3-4-2.7-6-4-1.4-1-3.3-1-4.8 0-5.7 3.8-11.5 7.7-17.2 11.5L5.2 29C3 30.4.1 31.8 0 34.8c-.1 3.3 0 6.7 0 10v16c0 2.9-.6 6.3 2.1 8.1 6.4 4.4 12.9 8.6 19.4 12.9 8 5.3 16 10.7 24 16 2.2 1.5 4.4 3.1 7.1 1.3 2.3-1.5 4.5-3 6.8-4.5 8.9-5.9 17.8-11.9 26.7-17.8l9.9-6.6c.6-.4 1.3-.8 1.9-1.3 1.4-1 2-2.4 2-4.1V37.3c.1-1.1.2-2.1.1-3.1 0-.1 0 .2 0 0zM54.3 12.3L88 34.8 73 44.9 54.3 32.4V12.3zm-8.6 0v20L27.1 44.8 12 34.8l33.7-22.5zM8.6 42.8L19.3 50 8.6 57.2V42.8zm37.1 44.9L12 65.2l15-10.1 18.6 12.5v20.1zM50 60.2L34.8 50 50 39.8 65.2 50 50 60.2zm4.3 27.5v-20l18.6-12.5 15 10.1-33.6 22.4zm37.1-30.5L80.7 50l10.8-7.2-.1 14.4z"></path></svg>],
    ["Github", "https://github.com/theuncleofAlex", <svg xmlns="http://www.w3.org/2000/svg" className="octicon octicon-mark-github v-align-middle" height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>],
];

function getNameIndex(scrollPos) {
    let ret = Math.floor(0.6-1*scrollPos/(window.innerHeight*0.9));
    ret = ret >= names.length ? 0 : ret;
    return ret;
}

const Banner = (props) => {
    return(
        <>
            <div class="banner-place"/>
            <div class="banner">
                <img
                    src={logo}
                    alt="Alex Yang logo"
                    onClick={
                        function() {
                            window.location.href = 'https://theuncleofalex.github.io/about-me';
                        }
                    }
                />
                <div class="links">
                    {props.getLinks()}
                </div>
            </div>
        </>
    );
};

const MyName = (props) => {
    let index = 0;
    const items = props.name.split("").map((item) => {
        const style = {
            animation: props.animate
                ? ('dash 9s ease-out ' + index*0.05 + 's forwards, filling 1s ease-out ' + (0.05*index+0.1) + 's forwards')
                : "",
        };
        index++;
        return(<tspan style={style}>{item}</tspan>);
    });
    return(
        <>
            <text
                x="0" y="55%"
                dominantBaseline="middle"
                textAnchor="left">
                {items}
            </text>
        </>
    );
}
;
class Name extends React.Component {
    // eslint-disable-next-line no-useless-constructor
  constructor(props) {
      super(props);
      this.state = {
          animate: true,
          prevIndex: this.props.index,
          fadeOut: false,
          firstTime: true,
          name: names[this.props.index],
      }
  }

  animate() {
      this.setState({
          prevIndex: this.props.index,
          firstTime: false
      });
      if(!this.state.firstTime) this.setState({fadeOut: true});
      setTimeout(() => {
          this.setState({fadeOut: false});
          this.setState({animate: true});
          this.setState({name: names[this.props.index]});
          setTimeout(() => {
              this.setState({animate: false});
          }, 1750);
      }, 1200);
  }

  render() {
      if(this.props.index !== this.state.prevIndex || this.state.firstTime) {
          this.animate();
      }
      return (
        <div class="my-name">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="100"
                stroke="#83cafc" fill="#83cafc" strokeWidth="2"
                className={"text-line " + (this.state.animate ? "animate " : "") + (this.state.fadeOut ? "fadeOut" : "")}>
                <MyName name={this.state.name} animate={this.state.animate} fadeOut={this.state.fadeOut}/>
            </svg>
        </div>
    )
  }
}

class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slidein: false,
            slideout: true,
            previndex: this.props.index,
            curindex: this.props.index,
            firsttime: true,
        }
    }

    animate() {
        this.setState({previndex: this.props.index, firsttime: false});
        this.setState({slidein: true});
        setTimeout(() => {
            this.setState({curindex: this.props.index, slideout: true, slidein: false});
            setTimeout(() => {
                this.setState({slideout: false});
            }, 1000);
        }, 1000);
    }

    learnMore() {
        this.props.setExpanded(!this.props.expanded);
    }

    render() {
        if(this.props.index !== this.state.previndex || this.state.firsttime) this.animate();
        const learnMoreText = this.props.expanded ? "Back" : "Learn More";
        const buttonClass = "learn-more " + (this.props.expanded ? "expanded" : "");
        const arrow = this.props.expanded ? "keyboard_arrow_left" : "keyboard_arrow_right";
        let contents = [
            <span>{learnMoreText}</span>,
            <i className = "material-icons" >{arrow}</i>
        ];
        if(this.props.expanded) contents.swap(0, 1);
        return (
            <>
                <div
                    class={"description " + (this.state.slidein ? "slidein " : "") + (this.state.slideout ? "slideout" : "")}
                >{text[this.state.curindex]}
                    <div className="secondary-description">
                        <span className={buttonClass} onClick={
                            () => {this.learnMore();}
                        }>
                            {contents}
                        </span>
                    </div>
                </div>
            </>
        );
    }
}

class ShowCards extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let cards = images[this.props.index]["cards"].map(item => {
            const href = item["href"];
            return(
                <div class="card" onClick={
                    () => {window.open(href);}}
                >
                    <div class="card-header">{item["header"]}</div>
                    <div class="card-description">{item["description"]}</div>
                </div>
            );
        });
        return(
            <StaggeredComponents
                elements = {cards}
                className = {"card-con"}
                animated = {this.props.expanded}
                transformFunction = "translateX(0)"
                delayFunction = {index => {return(index*0.3+0.2);}}
                durationFunction = {index => {return(1-index*0.2);}}
            />
        )
    }
}

class ExpandedTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animating: false,
        }
    }

    render() {
        let elements = [];
        const imageData = images[this.props.index];
        imageData["description"].map(item => {
            const descriptionDiv = <p>{item}</p>;
            elements.push(descriptionDiv);
        });
        const cardHeader = imageData["cardHeader"];
        if(cardHeader) {
            elements.push(<div class="expand-header">{cardHeader}</div>);
            elements.push(
                <div class="cards">
                    <ShowCards
                        expanded={this.props.expanded}
                        index={this.props.index}
                    />
                </div>
            );
        }
        return(
            <>
                <div class="expanded-tab">
                    <StaggeredComponents
                        elements = {elements}
                        animated = {this.props.expanded}
                        transformFunction = "translateX(0)"
                        durationFunction = {index => {return(1.25-index*0.15);}}
                        delayFunction = {index => {return(0.1+index*0.15);}}
                    />
                </div>
            </>
        );
    }
}

class Text extends React.Component {
    // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
        expanded: false,
    }
  }

  render() {
      const index = getNameIndex(this.props.scrollPos);
      const className = "text-con " + (this.state.expanded ? "expanded" : "");
      return (
          <>
              <div class={className}>
                  <div class="text">
                      <div class="main-header">
                          I'm<Name index={index}/>
                      </div>
                      <Description
                          index={index}
                          expanded={this.state.expanded}
                          setExpanded={(exp) => {
                              this.setState({expanded: exp});
                              this.props.setExpanded(exp);
                          }}
                      />
                  </div>
                  <ExpandedTab index={index} expanded={this.state.expanded}/>
              </div>
          </>
      );
  }
}

class Images extends React.Component {
    // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
      const className = "images" + (this.props.expanded ? " expanded" : "");
      return (
        <div class={className}>
            {this.props.getImages()}
        </div>
    )
  }
}

const ScrollButton = (props) => {
    const isHidden = () => {return props.scrollPos < -50;};
    const className = "scroll " + (isHidden() ? "hide" : "show");
    const scrollBadge = (
        <div class={className}>
              <div className="scroll-ripple"/>
              <div class="scroll-badge">
                  <img src={arrow} alt="scroll down arrow"/>
              </div>
        </div>
    );
    return(
      <>
          {scrollBadge}
      </>
    );
};

const Footer = (props) => {
    const contacts = [];
    for(const x in contactBadges) {
        const cur = contactBadges[x];
        const link = cur[1];
        const imgsrc = cur[2];
        if(link && imgsrc) {
            const ret = (<div class="contact-badge" onClick={
                () => {window.open(link);}}>
                {imgsrc}
            </div>);
            contacts.push(ret);
        }
    }
    return(
      <footer>
          <div class="contact">
              <div className="footer-header">Contact</div>
              <div className="contacts">{contacts}</div>
          </div>
          <div class="nav">
              <div className="footer-header">Navigation</div>
              {props.getLinks()}
          </div>
          <div class="about-site">This website was coded from scratch using the React Library. Open source on <a href="https://github.com/theuncleofAlex/about-me/">Github</a>.</div>
      </footer>
    );
};

function App() {
    const [scrollPos, setScrollPos] = React.useState(0);
    const [expanded, setExpanded] = React.useState(false);
    useScrollPosition(({ prevPos, currPos }) => {
      setScrollPos(currPos.y);
    }, [scrollPos]);

    let imageRefs = {};
    const getImages = () => {
        return images.map(image => {
            const ref = React.createRef();
            const id = image.id;
            const img = (<div ref={ref} className="pseudo-img" id={id}>
                {id}
            </div>);
            imageRefs[id] = ref;
            return(img);
      });
    };

    const getLinks = () => {
        return images.map(image => {
            const linkName = image.link;
            const isPrimary = linkName === "Contact";
            if (linkName) {
                const imageId = image.id;
                return(
                    <a className={isPrimary?"primary-link":""} href="#" onClick={
                        (e) => {
                            e.preventDefault();
                            imageRefs[imageId].current.scrollIntoView({behavior: "smooth"});
                        }
                    }>
                        <span>{linkName}</span>
                    </a>);
            }
        }
      );
    };

    const className = expanded ? "expanded" : "";
    return (
    <>
        <Banner getLinks={getLinks}/>
        <main className={className}>
            <Images getImages={getImages} expanded={expanded}/>
            <Text scrollPos={scrollPos} setExpanded={setExpanded}/>
        </main>
        <ScrollButton scrollPos={scrollPos}/>
        <Footer getLinks={getLinks}/>
    </>
  );
}

export default App;
