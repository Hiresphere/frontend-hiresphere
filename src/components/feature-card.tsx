import { motion } from 'framer-motion';
import {
    Briefcase,
    MessageSquare,
    FileText,
    Video,
    BarChart2,
    Brain,
    GraduationCap,
} from 'lucide-react';

interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
}

// Animation variants
const cardVariants = {
    hover: {
        y: -10,
        boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)',
        transition: { duration: 0.3 },
    },
};

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
    const getIcon = () => {
        switch (icon) {
            case 'job-automation':
                return <Briefcase className="h-10 w-10 text-primary" />;
            case 'cold-outreach':
                return <MessageSquare className="h-10 w-10 text-primary" />;
            case 'resume-builder':
                return <FileText className="h-10 w-10 text-primary" />;
            case 'interview-simulator':
                return <Video className="h-10 w-10 text-primary" />;
            case 'market-insights':
                return <BarChart2 className="h-10 w-10 text-primary" />;
            case 'career-coach':
                return <Brain className="h-10 w-10 text-primary" />;
            case 'placement-prep':
                return <GraduationCap className="h-10 w-10 text-primary" />;
            default:
                return <Briefcase className="h-10 w-10 text-primary" />;
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all duration-300"
        >
            <div className="mb-4 p-3 bg-blue-50 rounded-lg w-12 h-12 flex items-center justify-center">
                {getIcon()}
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </motion.div>
    );
}
