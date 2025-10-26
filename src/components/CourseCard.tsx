import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  duration: string;
  badge?: string;
  description?: string;
}

export const CourseCard = ({ id, title, duration, badge = "Aula" }: CourseCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
      className="course-card group cursor-pointer"
      onClick={() => navigate(`/course/${id}`)}
    >
      <div className="course-card-content">
        {/* Front */}
        <div className="course-card-front">
          <div className="course-card-bg">
            <div className="floating-circle" />
            <div className="floating-circle floating-circle-right" />
            <div className="floating-circle floating-circle-bottom" />
          </div>
          <div className="course-card-front-content">
            <span className="course-badge">{badge}</span>
            <div className="course-description">
              <div className="course-title-wrapper">
                <p className="course-title">
                  <strong>{title}</strong>
                </p>
                <svg 
                  className="bookmark-icon" 
                  fillRule="nonzero" 
                  height="15px" 
                  width="15px" 
                  viewBox="0,0,256,256" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="currentColor">
                    <g transform="scale(8,8)">
                      <path d="M25,27l-9,-6.75l-9,6.75v-23h18z" />
                    </g>
                  </g>
                </svg>
              </div>
              <p className="course-footer">{duration}</p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="course-card-back">
          <div className="course-card-back-content">
            <GraduationCap className="w-16 h-16 text-primary" />
            <strong className="text-primary text-lg">Visualizar</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
