'use client';

import Button from "@/components/Button";
import Card from "@/components/Card";

export default function Projects() {
    return (
        <main>
            <h1>Projects</h1>
            <p>This is the projects page.</p>
            <Card>
                <h3>Project Card Example</h3>
                <p>This is an example of a project card.</p>
                <Button href="/projects/example" level={2}>Learn More</Button>
            </Card>
            <Card>
                <h3>Project Card Example</h3>
                <p>This button alerts the page.</p>
                <Button onClick={() => alert('Alert!')} level={3}>Alert?</Button>
            </Card>
        </main>
    );
}