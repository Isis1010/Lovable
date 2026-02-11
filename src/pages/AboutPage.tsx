import { Link } from 'react-router-dom';
import { Music, Heart, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-neon-blue neon-glow-blue mb-6">
          <Music className="w-10 h-10 text-neon-blue" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 neon-text-blue">
          About NeonStream
        </h1>
        <p className="text-xl text-muted-foreground">
          Music for the digital generation. Bold. Unapologetic. Electric.
        </p>
      </div>

      {/* Mission */}
      <section className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-2 bg-neon-blue rounded-full" />
          Our Mission
        </h2>
        <div className="p-6 border border-border rounded-xl">
          <p className="text-lg leading-relaxed text-muted-foreground">
            NeonStream was born from a simple belief: music should be as bold and vibrant 
            as the artists who create it. We're building a platform that celebrates 
            creativity, supports artists directly, and delivers an experience that's 
            as unique as your taste in music.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-2 bg-neon-blue rounded-full" />
          What We Believe
        </h2>
        <div className="grid gap-4">
          <div className="p-6 border border-border rounded-xl hover:border-neon-blue transition-colors">
            <div className="flex items-start gap-4">
              <Heart className="w-8 h-8 text-neon-blue flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Artists First</h3>
                <p className="text-muted-foreground">
                  We believe creators deserve fair compensation. That's why we're 
                  committed to transparent royalty structures and direct artist support.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border border-border rounded-xl hover:border-neon-blue transition-colors">
            <div className="flex items-start gap-4">
              <Zap className="w-8 h-8 text-neon-blue flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We're constantly pushing boundaries with features like dynamic theming, 
                  high-quality audio, and immersive listening experiences.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border border-border rounded-xl hover:border-neon-blue transition-colors">
            <div className="flex items-start gap-4">
              <Globe className="w-8 h-8 text-neon-blue flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Global Community</h3>
                <p className="text-muted-foreground">
                  Music transcends borders. We're building a platform for listeners 
                  and artists from every corner of the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto text-center">
        <div className="p-8 border-2 border-neon-blue rounded-2xl neon-glow-blue">
          <h2 className="text-2xl font-bold mb-4">Join the Movement</h2>
          <p className="text-muted-foreground mb-6">
            Ready to experience music differently? Start streaming today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/sign-up">Create Free Account</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/donate">Support Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
